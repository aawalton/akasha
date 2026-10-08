import type { TemperCompanionTrait } from "akasha/temper/catalog/companion/trait/temper-companion-trait.page-type.types.ts"

export const bolstered = {
  id: "01a05fce-c4af-7566-b544-fc48ca193628",
  type: "page-type/temper-companion-trait",
  slug: "bolstered",
  key: "bolstered",
  title: "Bolstered",
  description: "Reduces companion damage taken",
  metricId: "temper-companion-passive-metric/companion-damage-taken",
  effectType: "fractional-change",
  isReduction: true,
  hashPlace: 3,
  esoWeaponTraitType: 41,
  esoArmorTraitType: 50,
  esoJewelryTraitType: 59,
  ttcTraitId: 28,
  createdAt: "2026-09-02T01:49:41.423Z",
  updatedAt: "2026-09-27T02:54:48.000Z",
} as const satisfies TemperCompanionTrait
