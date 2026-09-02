import type { TemperWeaponTrait } from "../../temper-weapon-trait.page-type.ts"

export const defending = {
  id: "01a05fd8-a45f-7124-bc10-21935ebe939b",
  pageTypeSlug: "temper-weapon-trait",
  slug: "defending",
  title: "Defending",
  key: "defending",
  effect: "Increases Physical and Spell Resistance",
  material: "Turquoise",
  esoTraitConstantName: "ITEM_TRAIT_TYPE_WEAPON_DEFENDING",
  displayOrder: 3,
  effects: "jsonl",
  qualityValues: "jsonl",
} as const satisfies TemperWeaponTrait
