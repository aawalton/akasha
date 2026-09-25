import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const robiersVegetableGarden = {
  id: "01a0d5e3-5625-7c68-8c7e-2857e900e114",
  type: "page-type/temper-lore-book",
  slug: "robiers-vegetable-garden",
  title: "Robier's Vegetable Garden",
  collection: "temper-lore-collection/the-trial-of-eyevea",
  bookIndex: 3,
  shalidorPins: "jsonl",
} as const satisfies TemperLoreBook
