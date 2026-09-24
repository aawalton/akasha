import type { TemperJewelryTrait } from "akasha/temper/catalog/gear/temper-jewelry-trait/temper-jewelry-trait.page-type.types.ts"

export const triune = {
  id: "019e5b97-6d96-7db5-902b-64e6d928282a",
  type: "page-type/temper-jewelry-trait",
  slug: "triune",
  title: "Triune",
  key: "triune",
  effect: "Increases Maximum Health, Magicka, and Stamina",
  material: "Dawn-Prism",
  esoTraitConstantName: "ITEM_TRAIT_TYPE_JEWELRY_TRIUNE",
  displayOrder: 9,
  effects: "jsonl",
} as const satisfies TemperJewelryTrait
