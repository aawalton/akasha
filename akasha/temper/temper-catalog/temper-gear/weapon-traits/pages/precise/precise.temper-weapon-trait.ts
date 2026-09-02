import type { TemperWeaponTrait } from "../../temper-weapon-trait.page-type.ts"

export const precise = {
  id: "01a05fd8-a461-71fd-8da7-8cc6d2b02a5e",
  pageTypeSlug: "temper-weapon-trait",
  slug: "precise",
  title: "Precise",
  key: "precise",
  effect: "Increases Weapon and Spell Critical",
  material: "Ruby",
  esoTraitConstantName: "ITEM_TRAIT_TYPE_WEAPON_PRECISE",
  displayOrder: 7,
  effects: "jsonl",
  qualityValues: "jsonl",
} as const satisfies TemperWeaponTrait
