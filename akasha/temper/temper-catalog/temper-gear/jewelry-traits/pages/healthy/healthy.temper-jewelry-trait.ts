import type { TemperJewelryTrait } from "../../temper-jewelry-trait.page-type.ts"

export const healthy = {
  id: "01a05fd8-a435-71a1-97d7-3bf92f493d4e",
  pageTypeSlug: "temper-jewelry-trait",
  slug: "healthy",
  title: "Healthy",
  key: "healthy",
  effect: "Increases Maximum Health",
  material: "Antimony",
  esoTraitConstantName: "ITEM_TRAIT_TYPE_JEWELRY_HEALTHY",
  displayOrder: 4,
  effects: "jsonl",
  qualityValues: "jsonl",
} as const satisfies TemperJewelryTrait
