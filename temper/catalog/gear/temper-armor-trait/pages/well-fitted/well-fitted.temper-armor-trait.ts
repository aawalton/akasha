import type { TemperArmorTrait } from "akasha/temper/catalog/gear/temper-armor-trait/temper-armor-trait.page-type.types.ts"

export const wellFitted = {
  id: "01a05fb2-1bd1-73f9-bcca-bd39fc693315",
  type: "page-type/temper-armor-trait",
  slug: "well-fitted",
  title: "Well-Fitted",
  key: "well-fitted",
  effect: "Reduces Roll Dodge and Sprint cost",
  material: "Almandine",
  esoTraitConstantName: "ITEM_TRAIT_TYPE_ARMOR_WELL_FITTED",
  displayOrder: 9,
  effects: "jsonl",
  hashPlace: 9,
  available: true,
  createdAt: "2026-09-02T01:18:23.185Z",
  updatedAt: "2026-09-27T03:41:25.000Z",
} as const satisfies TemperArmorTrait
