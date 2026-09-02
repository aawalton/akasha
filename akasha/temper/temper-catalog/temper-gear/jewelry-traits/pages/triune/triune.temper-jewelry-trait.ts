import type { TemperJewelryTrait } from "../../temper-jewelry-trait.page-type.ts"

export const triune = {
  id: "01a05fd8-a437-7af5-8669-2859d3f7b3d1",
  pageTypeSlug: "temper-jewelry-trait",
  slug: "triune",
  title: "Triune",
  key: "triune",
  effect: "Increases Maximum Health, Magicka, and Stamina",
  material: "Dawn-Prism",
  esoTraitConstantName: "ITEM_TRAIT_TYPE_JEWELRY_TRIUNE",
  displayOrder: 9,
  effects: "jsonl",
  qualityValues: "jsonl",
} as const satisfies TemperJewelryTrait
