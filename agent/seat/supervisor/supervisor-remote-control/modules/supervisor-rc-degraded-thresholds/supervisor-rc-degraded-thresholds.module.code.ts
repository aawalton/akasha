export interface RcDegradedThresholds {
  readonly healthyFloor: number
  readonly debounceStreak: number
  readonly recoveryStreak: number
  readonly reAlertCooldownMs: number
  readonly bootSettleMs: number
  readonly bootCeilingMs: number
  readonly bootRetryEnabled: boolean
}
