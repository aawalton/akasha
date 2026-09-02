import type { TemperJewelryTrait } from "../../temper-jewelry-trait.page-type.ts"

export const arcane = {
  id: "01a05fd8-a434-7fa0-8c63-0cb4e957c62b",
  pageTypeSlug: "temper-jewelry-trait",
  slug: "arcane",
  title: "Arcane",
  key: "arcane",
  effect: "Increases Maximum Magicka",
  material: "Cobalt",
  esoTraitConstantName: "ITEM_TRAIT_TYPE_JEWELRY_ARCANE",
  displayOrder: 1,
  effects: "jsonl",
  qualityValues: "jsonl",
} as const satisfies TemperJewelryTrait
