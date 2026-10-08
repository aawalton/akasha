import type { TemperCompanionTrait } from "akasha/temper/catalog/companion/trait/temper-companion-trait.page-type.types.ts"

export const shattering = {
  id: "01a05fce-c4b0-75e4-8085-89376ec1cdf3",
  type: "page-type/temper-companion-trait",
  slug: "shattering",
  key: "shattering",
  title: "Shattering",
  description: "Increases companion Penetration",
  metricId: "temper-companion-passive-metric/companion-penetration",
  effectType: "integer",
  isReduction: false,
  hashPlace: 7,
  esoWeaponTraitType: 37,
  esoArmorTraitType: 46,
  esoJewelryTraitType: 55,
  ttcTraitId: 32,
  createdAt: "2026-09-02T01:49:41.424Z",
  updatedAt: "2026-09-27T02:54:48.000Z",
} as const satisfies TemperCompanionTrait
