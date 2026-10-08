import type { TemperCompanionTrait } from "akasha/temper/catalog/companion/trait/temper-companion-trait.page-type.types.ts"

export const prolific = {
  id: "01a05fce-c4b0-7db1-b613-848e703bbfc8",
  type: "page-type/temper-companion-trait",
  slug: "prolific",
  key: "prolific",
  title: "Prolific",
  description: "Increases companion Ultimate generation",
  metricId: "temper-companion-passive-metric/companion-ultimate-generation",
  effectType: "fractional-change",
  isReduction: false,
  hashPlace: 5,
  esoWeaponTraitType: 35,
  esoArmorTraitType: 44,
  esoJewelryTraitType: 53,
  ttcTraitId: 30,
  createdAt: "2026-09-02T01:49:41.424Z",
  updatedAt: "2026-09-27T02:54:48.000Z",
} as const satisfies TemperCompanionTrait
