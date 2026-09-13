export interface RcSeatStreak {
  readonly degradedStreak: number
  readonly healthyStreak: number
}

export const INITIAL_RC_SEAT_STREAK: RcSeatStreak = {
  degradedStreak: 0,
  healthyStreak: 0,
}

export interface RcConfirmLatch {
  readonly alertedAt: number | null
}

export const CLEAR_RC_CONFIRM_LATCH: RcConfirmLatch = {
  alertedAt: null,
}

export type RcDegradedAction = "none" | "alert" | "boot-dark"
