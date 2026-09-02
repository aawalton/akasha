import type { TemperJewelryTrait } from "../../temper-jewelry-trait.page-type.ts"

export const protective = {
  id: "01a05fd8-a437-7ef6-a4e7-2de869003bc2",
  pageTypeSlug: "temper-jewelry-trait",
  slug: "protective",
  title: "Protective",
  key: "protective",
  effect: "Increases Physical and Spell Resistance",
  material: "Titanium",
  esoTraitConstantName: "ITEM_TRAIT_TYPE_JEWELRY_PROTECTIVE",
  displayOrder: 6,
  effects: "jsonl",
  qualityValues: "jsonl",
} as const satisfies TemperJewelryTrait
