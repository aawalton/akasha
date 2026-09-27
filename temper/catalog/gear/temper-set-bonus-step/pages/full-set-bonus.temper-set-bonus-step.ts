import type { TemperSetBonusStep } from "akasha/temper/catalog/gear/temper-set-bonus-step/temper-set-bonus-step.page-type.types.ts"

export const fullSetBonus = {
  id: "01a0e171-0563-73c5-92ad-d59dfcf3458b",
  type: "page-type/temper-set-bonus-step",
  slug: "full-set-bonus",
  title: "Full set bonus",
  setBonusScale: 1,
} as const satisfies TemperSetBonusStep
