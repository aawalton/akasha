import type { TemperCompanionTrait } from "akasha/temper/catalog/companion/trait/temper-companion-trait.page-type.types.ts"

export const focused = {
  id: "01a05fce-c4af-7d13-ad7c-a7e9b1934c38",
  type: "page-type/temper-companion-trait",
  slug: "focused",
  key: "focused",
  title: "Focused",
  description: "Increases companion Critical Strike rating",
  metricId: "temper-companion-passive-metric/companion-critical-chance",
  effectType: "integer",
  isReduction: false,
  hashPlace: 4,
  esoWeaponTraitType: 36,
  esoArmorTraitType: 45,
  esoJewelryTraitType: 54,
  ttcTraitId: 29,
  createdAt: "2026-09-02T01:49:41.423Z",
  updatedAt: "2026-09-27T02:54:48.000Z",
} as const satisfies TemperCompanionTrait
