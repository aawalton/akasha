import type { TemperCompanionRotationTiming } from "akasha/temper/catalog/companion/rotation-timing/temper-companion-rotation-timing.page-type.types.ts"

export const globalCooldown = {
  id: "01a0dee9-6d53-7f7c-9d61-8e78c7c04182",
  type: "page-type/temper-companion-rotation-timing",
  slug: "global-cooldown",
  key: "global-cooldown",
  title: "Global Cooldown",
  timingValue: 1,
} as const satisfies TemperCompanionRotationTiming
