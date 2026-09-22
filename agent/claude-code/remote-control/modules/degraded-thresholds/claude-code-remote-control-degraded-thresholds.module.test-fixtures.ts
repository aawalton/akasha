import type { RcDegradedThresholds } from "akasha/agent/claude-code/remote-control/modules/degraded-thresholds/claude-code-remote-control-degraded-thresholds.module.code.ts"

const RC_CONNECTION_SIGNATURE = {
  activeStart: 7,
  idleBaseline: 2,
  degraded: 1,
} as const

const DEFAULT_HEALTHY_FLOOR = RC_CONNECTION_SIGNATURE.idleBaseline

const DEFAULT_DEBOUNCE_STREAK = 4

const DEFAULT_RECOVERY_STREAK = DEFAULT_DEBOUNCE_STREAK

const DEFAULT_REALERT_COOLDOWN_SEC = 1800

const DEFAULT_BOOT_SETTLE_SEC = 90

const DEFAULT_BOOT_CEILING_SEC = 600

const DEFAULT_BOOT_RETRY_ENABLED = true

export const DEFAULT_RC_DEGRADED_THRESHOLDS: RcDegradedThresholds = {
  healthyFloor: DEFAULT_HEALTHY_FLOOR,
  debounceStreak: DEFAULT_DEBOUNCE_STREAK,
  recoveryStreak: DEFAULT_RECOVERY_STREAK,
  reAlertCooldownMs: DEFAULT_REALERT_COOLDOWN_SEC * 1000,
  bootSettleMs: DEFAULT_BOOT_SETTLE_SEC * 1000,
  bootCeilingMs: DEFAULT_BOOT_CEILING_SEC * 1000,
  bootRetryEnabled: DEFAULT_BOOT_RETRY_ENABLED,
}
