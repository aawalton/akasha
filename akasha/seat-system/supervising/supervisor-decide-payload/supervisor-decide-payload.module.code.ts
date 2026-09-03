import type {
  ClaimedCandidate,
  ClaimedTranscriptFinding,
} from "@akasha/seat-system/supervisor-claimed-redelivery-decide"
import type { LimitResumeInput } from "@akasha/seat-system/supervisor-limit-resume-decide"
import type { RcDegradedSeat } from "@akasha/seat-system/supervisor-rc-degraded-decide"
import type { RemoteControlSeatQuestion } from "@akasha/seat-system/supervisor-remote-control-decide"
import type { RestartNowEvent } from "@akasha/seat-system/supervisor-restart-notice-decide"
import type { UncertainBlockSeat } from "@akasha/seat-system/supervisor-uncertain-wait-decide"
import type { WaitResumeInput } from "@akasha/seat-system/supervisor-wait-resume-decide"
import { arr, bool, maybe, num, obj, oneOf, str } from "@tools/lib/narrow"

export function parseUncertainWait(value: unknown, path: string): UncertainBlockSeat[] {
  return arr(value, path).map((entry, at) => {
    const where = `${path}[${at}]`
    const seat = obj(entry, where)
    const state = obj(seat.state, `${where}.state`)
    const reading = obj(seat.reading, `${where}.reading`)
    return {
      seat: str(seat.seat, `${where}.seat`),
      state: {
        sinceMs: maybe(state.sinceMs, `${where}.state.sinceMs`, num),
        escalated: bool(state.escalated, `${where}.state.escalated`),
      },
      reading: {
        blockedByUncertainClaimant: bool(
          reading.blockedByUncertainClaimant,
          `${where}.reading.blockedByUncertainClaimant`
        ),
        nowMs: num(reading.nowMs, `${where}.reading.nowMs`),
        boundMs: num(reading.boundMs, `${where}.reading.boundMs`),
      },
    }
  })
}

export function parseRemoteControl(value: unknown, path: string): RemoteControlSeatQuestion[] {
  return arr(value, path).map((entry, at) => {
    const where = `${path}[${at}]`
    const seat = obj(entry, where)
    const question = obj(seat.question, `${where}.question`)
    return {
      seat: str(seat.seat, `${where}.seat`),
      question: {
        headless: bool(question.headless, `${where}.question.headless`),
      },
    }
  })
}

const CLAIM_OUTCOMES: readonly ClaimedTranscriptFinding["outcome"][] = [
  "injected",
  "lost",
  "not-yet",
  "absent",
]

export function parseClaimedRedelivery(
  value: unknown,
  path: string
): { readonly candidates: readonly ClaimedCandidate[]; readonly processStartedAtMs: number } {
  const question = obj(value, path)
  return {
    processStartedAtMs: num(question.processStartedAtMs, `${path}.processStartedAtMs`),
    candidates: arr(question.candidates, `${path}.candidates`).map((entry, at) => {
      const where = `${path}.candidates[${at}]`
      const candidate = obj(entry, where)
      return {
        id: str(candidate.id, `${where}.id`),
        claimedAtMs: num(candidate.claimedAtMs, `${where}.claimedAtMs`),
        finding: maybe(candidate.finding, `${where}.finding`, (raw, at2) => {
          const finding = obj(raw, at2)
          return {
            outcome: oneOf(finding.outcome, `${at2}.outcome`, CLAIM_OUTCOMES),
            selfRead: bool(finding.selfRead, `${at2}.selfRead`),
          }
        }),
      }
    }),
  }
}

export function parseLimitResume(value: unknown, path: string): LimitResumeInput {
  const input = obj(value, path)
  const holdMs = maybe(input.eligibilityHoldMs, `${path}.eligibilityHoldMs`, num)
  const base = {
    deathDetected: bool(input.deathDetected, `${path}.deathDetected`),
    poolHasCapacity: bool(input.poolHasCapacity, `${path}.poolHasCapacity`),
    eligibilityHeldMs: maybe(input.eligibilityHeldMs, `${path}.eligibilityHeldMs`, num),
    earliestResetMs: maybe(input.earliestResetMs, `${path}.earliestResetMs`, num),
    now: num(input.now, `${path}.now`),
    recentlyNudged: bool(input.recentlyNudged, `${path}.recentlyNudged`),
  }
  return holdMs === null ? base : { ...base, eligibilityHoldMs: holdMs }
}

export function parseWaitResume(value: unknown, path: string): WaitResumeInput {
  const input = obj(value, path)
  return {
    deathDetected: bool(input.deathDetected, `${path}.deathDetected`),
    consecutiveDeaths: num(input.consecutiveDeaths, `${path}.consecutiveDeaths`),
    lastNudgeAtMs: maybe(input.lastNudgeAtMs, `${path}.lastNudgeAtMs`, num),
    now: num(input.now, `${path}.now`),
  }
}

export function parseRcDegraded(value: unknown, path: string): RcDegradedSeat[] {
  return arr(value, path).map((entry, at) => {
    const where = `${path}[${at}]`
    const seat = obj(entry, where)
    const streak = obj(seat.priorStreak, `${where}.priorStreak`)
    const latch = obj(seat.latch, `${where}.latch`)
    const observation = obj(seat.observation, `${where}.observation`)
    const thresholds = obj(seat.thresholds, `${where}.thresholds`)
    return {
      seat: str(seat.seat, `${where}.seat`),
      priorStreak: {
        degradedStreak: num(streak.degradedStreak, `${where}.priorStreak.degradedStreak`),
        healthyStreak: num(streak.healthyStreak, `${where}.priorStreak.healthyStreak`),
      },
      latch: { alertedAt: maybe(latch.alertedAt, `${where}.latch.alertedAt`, num) },
      observation: {
        edgeCount: maybe(observation.edgeCount, `${where}.observation.edgeCount`, num),
        childAgeMs: maybe(observation.childAgeMs, `${where}.observation.childAgeMs`, num),
        maintenanceResumeQuiet: bool(
          observation.maintenanceResumeQuiet,
          `${where}.observation.maintenanceResumeQuiet`
        ),
        now: num(observation.now, `${where}.observation.now`),
      },
      thresholds: {
        healthyFloor: num(thresholds.healthyFloor, `${where}.thresholds.healthyFloor`),
        debounceStreak: num(thresholds.debounceStreak, `${where}.thresholds.debounceStreak`),
        recoveryStreak: num(thresholds.recoveryStreak, `${where}.thresholds.recoveryStreak`),
        reAlertCooldownMs: num(
          thresholds.reAlertCooldownMs,
          `${where}.thresholds.reAlertCooldownMs`
        ),
        bootSettleMs: num(thresholds.bootSettleMs, `${where}.thresholds.bootSettleMs`),
        bootCeilingMs: num(thresholds.bootCeilingMs, `${where}.thresholds.bootCeilingMs`),
        bootRetryEnabled: bool(thresholds.bootRetryEnabled, `${where}.thresholds.bootRetryEnabled`),
      },
    }
  })
}

const RESTART_ACTIONS: readonly RestartNowEvent["action"][] = ["restart-now"]

export function parseRestartNotice(
  value: unknown,
  path: string
): {
  readonly event: RestartNowEvent
  readonly ctx: { maintenance: boolean; reExecPending: boolean }
} {
  const question = obj(value, path)
  const event = obj(question.event, `${path}.event`)
  const ctx = obj(question.ctx, `${path}.ctx`)
  return {
    event: {
      action: oneOf(event.action, `${path}.event.action`, RESTART_ACTIONS),
      interruptMessage: maybe(event.interruptMessage, `${path}.event.interruptMessage`, str),
    },
    ctx: {
      maintenance: bool(ctx.maintenance, `${path}.ctx.maintenance`),
      reExecPending: bool(ctx.reExecPending, `${path}.ctx.reExecPending`),
    },
  }
}
