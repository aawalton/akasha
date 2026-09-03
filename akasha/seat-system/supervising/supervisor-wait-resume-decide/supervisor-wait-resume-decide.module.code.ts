export const WAIT_FIRST_MS = 30_000

export const WAIT_MAX_MS = 1_800_000

export interface WaitResumeInput {
  readonly deathDetected: boolean
  readonly consecutiveDeaths: number
  readonly lastNudgeAtMs: number | null
  readonly now: number
}

export type WaitResumeDecision =
  | { readonly kind: "nudge"; readonly reason: string; readonly attempt: number }
  | { readonly kind: "wait"; readonly reason: string; readonly readyAtMs: number }
  | { readonly kind: "hold"; readonly reason: string }

export function waitMs(consecutiveDeaths: number): number {
  const seen = Number.isFinite(consecutiveDeaths) ? Math.floor(consecutiveDeaths) : 1
  const doublings = Math.max(0, seen - 2)
  const grown = WAIT_FIRST_MS * 2 ** Math.min(doublings, 64)
  return Math.min(grown, WAIT_MAX_MS)
}

function seconds(ms: number): string {
  return `${Math.round(ms / 1000)}s`
}

export function decideWaitResume(input: WaitResumeInput): WaitResumeDecision {
  if (!input.deathDetected) {
    return { kind: "hold", reason: "the last turn did not end in a death" }
  }
  if (input.lastNudgeAtMs === null) {
    return {
      kind: "nudge",
      attempt: 1,
      reason: "died and never nudged — nothing has been tried yet",
    }
  }
  const seen = Math.max(1, Math.floor(input.consecutiveDeaths) || 1)
  const currentWaitMs = waitMs(seen)
  const readyAtMs = input.lastNudgeAtMs + currentWaitMs
  if (input.now >= readyAtMs) {
    return {
      kind: "nudge",
      attempt: seen,
      reason: `died ${seen} time(s) running and the ${seconds(currentWaitMs)} wait has passed`,
    }
  }
  return {
    kind: "wait",
    readyAtMs,
    reason: `died ${seen} time(s) running, ${seconds(readyAtMs - input.now)} left of the ${seconds(
      currentWaitMs
    )} wait`,
  }
}
