import type { SelectionPolicy } from "akasha/alan/value/health/fitness/selection-policy/selection-policy.page-type.types.ts"

export const selectionPolicy = {
  id: "01a06862-a02e-7416-95e5-bb41af7c60d1",
  type: "page-type/selection-policy",
  slug: "selection-policy",
  weeklySetFloor: 6,
  weeklySetCeiling: 12,
  nearFailureRpeFloor: 7,
  stretchesCoolingDown: 3,
  secondsHoldingStretch: 45,
  volumeLimitSeed: 3000,
  volumeLimitRise: 20,
  volumeLimitFall: 100,
  volumeLimitFrom: "2026-09-21",
  updatedAt: "2026-10-17T12:30:23.466Z",
  createdAt: "2026-09-03T17:48:09.134Z",
  legsVolumeLimitFactor: 2,
} as const satisfies SelectionPolicy
