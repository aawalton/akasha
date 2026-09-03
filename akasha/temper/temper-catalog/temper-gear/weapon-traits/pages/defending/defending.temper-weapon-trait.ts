import type { TemperWeaponTrait } from "../../temper-weapon-trait.page-type.ts"

export const defending = {
  id: "019e5b8b-e543-76d9-9b56-a31dc1c69412",
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
