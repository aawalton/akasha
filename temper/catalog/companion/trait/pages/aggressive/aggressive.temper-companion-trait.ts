import type { TemperCompanionTrait } from "akasha/temper/catalog/companion/trait/temper-companion-trait.page-type.types.ts"

export const aggressive = {
  id: "01a05fce-c4ae-76d4-b0f2-55ebd7f2e20e",
  type: "page-type/temper-companion-trait",
  slug: "aggressive",
  key: "aggressive",
  title: "Aggressive",
  description: "Increases companion damage done",
  metricId: "temper-companion-passive-metric/companion-damage-done",
  effectType: "fractional-change",
  isReduction: false,
  hashPlace: 1,
  esoWeaponTraitType: 38,
  esoArmorTraitType: 47,
  esoJewelryTraitType: 56,
  ttcTraitId: 26,
  createdAt: "2026-09-02T01:49:41.422Z",
  updatedAt: "2026-09-27T02:54:48.000Z",
} as const satisfies TemperCompanionTrait
