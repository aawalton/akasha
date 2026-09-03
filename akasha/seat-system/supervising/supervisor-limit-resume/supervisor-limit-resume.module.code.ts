import { summarizePool } from "@akasha/agents/claude-account-selection"
import { pacingIn } from "@akasha/agents/oauth-effects"
import type { AccountState } from "@akasha/agents/oauth-types"
import { AKASHA, resolveRoots, rootFor } from "@akasha/pages-system/checkout-roots"
import {
  type AskDecide,
  askLimitResume,
  LIMIT_RESUME_DECISION,
  type LimitResumeVerdict,
} from "@akasha/seat-system/supervisor-limit-resume-answer"
import {
  askSupervisorDecide,
  classifyRateLimitDeath,
} from "@akasha/seat-system/supervisor-limit-resume-effects"
import {
  ANNOUNCE,
  hasRecentInboundMessage,
  SYSTEM_SOURCE,
  sendMessage,
} from "@akasha/seat-system/supervisor-limit-resume-send"
import { readOwnTranscriptTail } from "@tools/lib/agent-io-probe"
import { USER_ID } from "@tools/lib/user-id"

export { type AskDecide, LIMIT_RESUME_DECISION }

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
    (async (agentId: string, content: string): Promise<void> => {
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
  let lastKind: TickKind = "none"
  const note = (kind: TickKind, line: string): undefined => {
    if (kind !== lastKind) opts.log?.(line)
    lastKind = kind
  }
  let eligibleSinceMs: number | null = null

  const tick = async (): Promise<void> => {
    if (tickInFlight || stopped) return
    tickInFlight = true
    try {
      const agentId = opts.getAgentId()
      if (agentId === null) return
      const text = readTranscriptTail(agentId)
      if (text === null || !classifyRateLimitDeath(text)) {
        lastKind = "none"
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
      lastKind = "nudge"
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
