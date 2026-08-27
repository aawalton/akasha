export const GLOBAL_RECOVERY_WINDOW_SEC = 60

export type RecoveryWindowInput = {
  globalTripped: boolean
  nowMs: number
  lastGlobalKillAtMs: number | null
  recoveryWindowMs: number
}

export type RecoveryWindowDecision = {
  execute: boolean
  recovered: boolean
  reason: string
}

export function assessRecoveryWindow(input: RecoveryWindowInput): RecoveryWindowDecision {
  if (!input.globalTripped) {
    return { execute: false, recovered: true, reason: "global leg clear — recovery window reset" }
  }
  if (input.lastGlobalKillAtMs === null) {
    return {
      execute: true,
      recovered: false,
      reason: "global leg tripped, no kill in flight — executing",
    }
  }
  const elapsedMs = input.nowMs - input.lastGlobalKillAtMs
  if (elapsedMs < input.recoveryWindowMs) {
    const remainingSec = ((input.recoveryWindowMs - elapsedMs) / 1000).toFixed(0)
    return {
      execute: false,
      recovered: false,
      reason: `global leg still tripped but within recovery window (${remainingSec}s remaining) — suppressing escalation, waiting for MemAvailable to recover`,
    }
  }
  return {
    execute: true,
    recovered: false,
    reason: `global leg still tripped ${(elapsedMs / 1000).toFixed(0)}s after last kill (recovery window elapsed) — escalating one more kill`,
  }
}
