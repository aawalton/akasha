import type { TemperCompanionTrait } from "akasha/temper/catalog/companion/trait/temper-companion-trait.page-type.types.ts"

export const soothing = {
  id: "01a05fce-c4b1-7c18-9828-60ac8b4aafa2",
  type: "page-type/temper-companion-trait",
  slug: "soothing",
  key: "soothing",
  title: "Soothing",
  description: "Increases companion healing done",
  metricId: "temper-companion-passive-metric/companion-healing-done",
  effectType: "fractional-change",
  isReduction: false,
  hashPlace: 8,
  esoWeaponTraitType: 39,
  esoArmorTraitType: 48,
  esoJewelryTraitType: 57,
  ttcTraitId: 33,
  createdAt: "2026-09-02T01:49:41.425Z",
  updatedAt: "2026-09-27T02:54:48.000Z",
} as const satisfies TemperCompanionTrait
