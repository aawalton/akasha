import type { TemperWeaponTrait } from "../../temper-weapon-trait.page-type.ts"

export const decisive = {
  id: "019e5b8b-e540-7c05-bac0-3b47430a460f",
  pageTypeSlug: "temper-weapon-trait",
  slug: "decisive",
  title: "Decisive",
  key: "decisive",
  effect: "Increases Ultimate Gain",
  material: "Citrine",
  esoTraitConstantName: "ITEM_TRAIT_TYPE_WEAPON_DECISIVE",
  displayOrder: 2,
  qualityValues: "jsonl",
} as const satisfies TemperWeaponTrait
