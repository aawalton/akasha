import type { TemperArmorTrait } from "akasha/temper/catalog/gear/temper-armor-trait/temper-armor-trait.page-type.types.ts"

export const training = {
  id: "01a05fb2-1bd1-76b9-a51c-6834aa119055",
  type: "page-type/temper-armor-trait",
  slug: "training",
  title: "Training",
  key: "training",
  effect: "Increases Experience gained from kills",
  material: "Emerald",
  esoTraitConstantName: "ITEM_TRAIT_TYPE_ARMOR_TRAINING",
  displayOrder: 8,
  effects: "jsonl",
  hashPlace: 8,
  available: true,
  createdAt: "2026-09-02T01:18:23.185Z",
  updatedAt: "2026-09-27T03:41:25.000Z",
} as const satisfies TemperArmorTrait
