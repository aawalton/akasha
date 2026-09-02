import type { TemperWeaponTrait } from "../../temper-weapon-trait.page-type.ts"

export const sharpened = {
  id: "01a05fd8-a461-7d8a-8d61-462e16b4da54",
  pageTypeSlug: "temper-weapon-trait",
  slug: "sharpened",
  title: "Sharpened",
  key: "sharpened",
  effect: "Increases Physical and Spell Penetration",
  material: "Fire Opal",
  esoTraitConstantName: "ITEM_TRAIT_TYPE_WEAPON_SHARPENED",
  displayOrder: 8,
  effects: "jsonl",
  qualityValues: "jsonl",
} as const satisfies TemperWeaponTrait
