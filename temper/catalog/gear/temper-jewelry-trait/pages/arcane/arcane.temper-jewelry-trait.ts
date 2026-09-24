import type { TemperJewelryTrait } from "akasha/temper/catalog/gear/temper-jewelry-trait/temper-jewelry-trait.page-type.types.ts"

export const arcane = {
  id: "019e5b97-6d83-7436-af5e-2eba1e7e972e",
  type: "page-type/temper-jewelry-trait",
  slug: "arcane",
  title: "Arcane",
  key: "arcane",
  effect: "Increases Maximum Magicka",
  material: "Cobalt",
  esoTraitConstantName: "ITEM_TRAIT_TYPE_JEWELRY_ARCANE",
  displayOrder: 1,
  effects: "jsonl",
} as const satisfies TemperJewelryTrait
