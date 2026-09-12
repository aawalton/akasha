import { summarizePool } from "akasha/agents/claude-accounts/modules/selection/claude-account-selection.module.code.ts"
import { readOwnTranscriptTail } from "akasha/agents/io-probe/io-probe.module.code.ts"
import { pacingIn } from "akasha/agents/models/gateway/modules/oauth-effects/oauth-effects.module.code.ts"
import type { AccountState } from "akasha/agents/models/gateway/modules/oauth-types/oauth-types.module.code.ts"
import {
  askSupervisorDecide,
  classifyRateLimitDeath,
} from "akasha/agents/seats/supervisors/modules/limit-resume-effects/supervisor-limit-resume-effects.module.code.ts"
import { USER_ID } from "akasha/alan/harness/supabase-auth/user-id/user-id.module.code.ts"
import {
  AKASHA,
  resolveRoots,
  rootFor,
} from "akasha/pages/checkout-roots/checkout-roots.module.code.ts"
import {
  type AskDecide,
  askLimitResume,
  type LimitResumeVerdict,
} from "akasha/seat-system/supervising/supervisor-limit-resume-answer/supervisor-limit-resume-answer.module.code.ts"
import {
  ANNOUNCE,
  hasRecentInboundMessage,
  SYSTEM_SOURCE,
  sendMessage,
} from "akasha/seat-system/supervising/supervisor-limit-resume-send/supervisor-limit-resume-send.module.code.ts"
import { tickSaying } from "akasha/seat-system/supervising/supervisor-tick-saying/supervisor-tick-saying.module.code.ts"

const LIMIT_RESUME_INTERVAL_MS = 30_000

type TickKind = LimitResumeVerdict["kind"] | "unreachable" | "none"

export function startLimitResumeMonitor(opts: {
  getAgentId: () => string | null
  log?: (line: string) => void
  readTranscriptTail?: (agentId: string) => string | null
  readPacing?: () => Promise<readonly AccountState[]>
  ask?: AskDecide
  hasRecentNudge?: (agentId: string, content: string, windowMs: number) => Promise<boolean>
  injectNudge?: (agentId: string, content: string) => Promise<void>
  now?: () => number
  tickMs?: number
  floorMs?: number
  eligibilityHoldMs?: number
}): { stop: () => void } {
  const readTranscriptTail = opts.readTranscriptTail ?? readOwnTranscriptTail
  const readPacing =
    opts.readPacing ?? (async () => [...pacingIn(rootFor(resolveRoots(), AKASHA)).values()])
  const ask = opts.ask ?? askSupervisorDecide
  const hasRecentNudge = opts.hasRecentNudge ?? hasRecentInboundMessage
  const injectNudge =
    opts.injectNudge ??
    (async (agentId: string, content: string): Promise<undefined> => {
      await sendMessage({
        targetAgentId: agentId,
        userId: USER_ID,
        content,
        source: SYSTEM_SOURCE,
        warrant: ANNOUNCE,
      })
    })
  const nowFn = opts.now ?? Date.now

  let stopped = false
  let tickInFlight = false
  const { note, marked } = tickSaying<TickKind>("none", opts.log)
  let eligibleSinceMs: number | null = null

  const tick = async (): Promise<undefined> => {
    if (tickInFlight || stopped) return
    tickInFlight = true
    try {
      const agentId = opts.getAgentId()
      if (agentId === null) return
      const text = readTranscriptTail(agentId)
      if (text === null || !classifyRateLimitDeath(text)) {
        marked("none")
        eligibleSinceMs = null
        return
      }
      const now = nowFn()
      const summary = summarizePool(await readPacing())
      const hasCapacity = summary.eligibleCount > 0
      if (hasCapacity) {
        eligibleSinceMs ??= now
      } else {
        eligibleSinceMs = null
      }
      const answer = await askLimitResume(ask, {
        deathDetected: true,
        poolHasCapacity: hasCapacity,
        eligibilityHeldMs: eligibleSinceMs == null ? null : now - eligibleSinceMs,
        ...(opts.eligibilityHoldMs === undefined
          ? {}
          : { eligibilityHoldMs: opts.eligibilityHoldMs }),
        earliestResetMs: summary.earliestEligibleResetMs,
        now,
        recentlyNudged: false,
      })
      if ("unreachable" in answer) {
        note("unreachable", `limit-resume: ${answer.unreachable}`)
        return
      }
      const verdict = answer.verdict
      if (verdict.kind !== "nudge") {
        note(verdict.kind, `limit-resume: ${verdict.kind} for ${agentId} — ${verdict.reason}`)
        return
      }
      const nudge = verdict.nudge
      const floorMs = opts.floorMs ?? verdict.floorMs
      if (await hasRecentNudge(agentId, nudge, floorMs)) {
        const why = `that nudge landed within ${floorMs}ms`
        note("hold", `limit-resume: floor holds for ${agentId} — ${why}`)
        return
      }
      await injectNudge(agentId, nudge)
      marked("nudge")
      opts.log?.(`limit-resume: nudged ${agentId} — ${verdict.reason}`)
    } catch (err) {
      opts.log?.(`limit-resume: tick error: ${String(err)}`)
    } finally {
      tickInFlight = false
    }
  }

  const timer = setInterval(() => void tick(), opts.tickMs ?? LIMIT_RESUME_INTERVAL_MS)
  timer.unref?.()

  return {
    stop: () => {
      stopped = true
      clearInterval(timer)
    },
  }
}
