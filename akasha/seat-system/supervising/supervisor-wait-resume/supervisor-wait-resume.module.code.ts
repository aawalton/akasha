import { askSupervisorDecide } from "@akasha/seat-system/supervisor-limit-resume-effects"
import {
  type AskDecide,
  askWaitResume,
  type WaitResumeVerdict,
} from "@akasha/seat-system/supervisor-wait-resume-answer"
import { WAIT_MAX_MS, waitMs } from "@akasha/seat-system/supervisor-wait-resume-decide"
import { readOwnTranscriptTail } from "@tools/lib/agent-io-probe"
import {
  CONNECTION_STATUS,
  classifyTurnEndErrorDeath,
} from "@tools/lib/classify-turn-end-error-death"
import {
  ANNOUNCE,
  hasRecentInboundMessage,
  SYSTEM_SOURCE,
  sendMessage,
} from "@tools/lib/supervisor-limit-resume-send"
import { USER_ID } from "@tools/lib/user-id"

const WAIT_RESUME_INTERVAL_MS = 30_000

type TickKind = WaitResumeVerdict["kind"] | "unreachable" | "none"

function kindsOf(statuses: readonly number[]): string {
  const seen = [...new Set(statuses)].map((one) =>
    one === CONNECTION_STATUS ? "connection" : "overload"
  )
  return seen.length === 0 ? "none" : seen.join(" and ")
}

export function startWaitResumeMonitor(opts: {
  getAgentId: () => string | null
  log?: (line: string) => void
  readTranscriptTail?: (agentId: string) => string | null
  ask?: AskDecide
  hasRecentNudge?: (agentId: string, content: string, windowMs: number) => Promise<boolean>
  injectNudge?: (agentId: string, content: string) => Promise<void>
  now?: () => number
  tickMs?: number
}): { stop: () => void } {
  const readTranscriptTail = opts.readTranscriptTail ?? readOwnTranscriptTail
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
  let lastNudgeAtMs: number | null = null
  let ceilingReported = false
  const note = (kind: TickKind, line: string): undefined => {
    if (kind !== lastKind) opts.log?.(line)
    lastKind = kind
  }

  const tick = async (): Promise<void> => {
    if (tickInFlight || stopped) return
    tickInFlight = true
    try {
      const agentId = opts.getAgentId()
      if (agentId === null) return
      const text = readTranscriptTail(agentId)
      const reading = text === null ? null : classifyTurnEndErrorDeath(text)
      if (reading === null || !reading.detected) {
        lastKind = "none"
        lastNudgeAtMs = null
        ceilingReported = false
        return
      }
      const now = nowFn()
      const currentWaitMs = waitMs(reading.consecutive)
      if (currentWaitMs >= WAIT_MAX_MS && !ceilingReported) {
        ceilingReported = true
        opts.log?.(
          `wait-resume: ${agentId} has died ${reading.consecutive} times running ` +
            `(${kindsOf(reading.statuses)}) and its wait is at the ceiling — ` +
            "still being nudged, and still not working"
        )
      }
      const answer = await askWaitResume(ask, {
        deathDetected: true,
        consecutiveDeaths: reading.consecutive,
        lastNudgeAtMs,
        now,
      })
      if ("unreachable" in answer) {
        note("unreachable", `wait-resume: ${answer.unreachable}`)
        return
      }
      const verdict = answer.verdict
      if (verdict.kind !== "nudge") {
        note(verdict.kind, `wait-resume: ${verdict.kind} for ${agentId} — ${verdict.reason}`)
        return
      }
      if (await hasRecentNudge(agentId, verdict.nudge, currentWaitMs)) {
        note("hold", `wait-resume: ${agentId} was nudged within ${currentWaitMs}ms — holding`)
        return
      }
      await injectNudge(agentId, verdict.nudge)
      lastNudgeAtMs = now
      lastKind = "nudge"
      opts.log?.(
        `wait-resume: nudged ${agentId} after ${kindsOf(reading.statuses)} — ${verdict.reason}`
      )
    } catch (err) {
      opts.log?.(`wait-resume: tick error: ${String(err)}`)
    } finally {
      tickInFlight = false
    }
  }

  const timer = setInterval(() => void tick(), opts.tickMs ?? WAIT_RESUME_INTERVAL_MS)
  timer.unref?.()

  return {
    stop: () => {
      stopped = true
      clearInterval(timer)
    },
  }
}
