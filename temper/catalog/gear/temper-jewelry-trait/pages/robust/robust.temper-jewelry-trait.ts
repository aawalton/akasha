import type { TemperJewelryTrait } from "akasha/temper/catalog/gear/temper-jewelry-trait/temper-jewelry-trait.page-type.types.ts"

export const robust = {
  id: "019e5b97-6d93-7d2a-a0f9-b218db3d4370",
  type: "page-type/temper-jewelry-trait",
  slug: "robust",
  title: "Robust",
  key: "robust",
  effect: "Increases Maximum Stamina",
  material: "Zinc",
  esoTraitConstantName: "ITEM_TRAIT_TYPE_JEWELRY_ROBUST",
  displayOrder: 7,
  effects: "jsonl",
} as const satisfies TemperJewelryTrait
