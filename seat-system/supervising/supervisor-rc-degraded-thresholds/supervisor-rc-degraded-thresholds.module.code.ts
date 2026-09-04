export const RC_CONNECTION_SIGNATURE = {
  activeStart: 7,
  idleBaseline: 2,
  degraded: 1,
} as const

export const DEFAULT_HEALTHY_FLOOR = RC_CONNECTION_SIGNATURE.idleBaseline

export const DEFAULT_DEBOUNCE_STREAK = 4

export const DEFAULT_RECOVERY_STREAK = DEFAULT_DEBOUNCE_STREAK

export const DEFAULT_REALERT_COOLDOWN_SEC = 1800

export const DEFAULT_BOOT_SETTLE_SEC = 90

export const DEFAULT_BOOT_CEILING_SEC = 600

export const DEFAULT_BOOT_RETRY_ENABLED = true

export interface RcDegradedThresholds {
  readonly healthyFloor: number
  readonly debounceStreak: number
  readonly recoveryStreak: number
  readonly reAlertCooldownMs: number
  readonly bootSettleMs: number
  readonly bootCeilingMs: number
  readonly bootRetryEnabled: boolean
}

export const DEFAULT_RC_DEGRADED_THRESHOLDS: RcDegradedThresholds = {
  healthyFloor: DEFAULT_HEALTHY_FLOOR,
  debounceStreak: DEFAULT_DEBOUNCE_STREAK,
  recoveryStreak: DEFAULT_RECOVERY_STREAK,
  reAlertCooldownMs: DEFAULT_REALERT_COOLDOWN_SEC * 1000,
  bootSettleMs: DEFAULT_BOOT_SETTLE_SEC * 1000,
  bootCeilingMs: DEFAULT_BOOT_CEILING_SEC * 1000,
  bootRetryEnabled: DEFAULT_BOOT_RETRY_ENABLED,
}
