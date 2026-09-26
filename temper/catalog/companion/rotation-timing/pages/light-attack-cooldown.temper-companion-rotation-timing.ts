import type { TemperCompanionRotationTiming } from "akasha/temper/catalog/companion/rotation-timing/temper-companion-rotation-timing.page-type.types.ts"

export const lightAttackCooldown = {
  id: "01a0dee9-6d54-79c6-89a7-a41b3da9744e",
  type: "page-type/temper-companion-rotation-timing",
  slug: "light-attack-cooldown",
  key: "light-attack-cooldown",
  title: "Light Attack Global Cooldown",
  timingValue: 0.7,
} as const satisfies TemperCompanionRotationTiming
