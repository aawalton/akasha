import type { TemperArmorTrait } from "../../temper-armor-trait.page-type.ts"

export const training = {
  id: "01a05fb2-1bd1-76b9-a51c-6834aa119055",
  pageTypeSlug: "temper-armor-trait",
  slug: "training",
  title: "Training",
  key: "training",
  effect: "Increases Experience gained from kills",
  material: "Emerald",
  esoTraitConstantName: "ITEM_TRAIT_TYPE_ARMOR_TRAINING",
  displayOrder: 8,
  effects: "jsonl",
  qualityValues: "jsonl",
} as const satisfies TemperArmorTrait
