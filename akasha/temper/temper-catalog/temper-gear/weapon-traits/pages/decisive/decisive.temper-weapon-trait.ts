import type { TemperWeaponTrait } from "../../temper-weapon-trait.page-type.ts"

export const decisive = {
  id: "01a05fd8-a45d-7be8-8434-704f2345792f",
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
