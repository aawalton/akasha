import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theTernionMonks = {
  id: "01a0d5e4-88dc-71d6-9d6e-d5d1053b55a6",
  type: "page-type/temper-lore-book",
  slug: "the-ternion-monks",
  title: "The Ternion Monks",
  collection: "temper-lore-collection/eastmarch-lore",
  bookIndex: 3,
  shalidorPins: "jsonl",
} as const satisfies TemperLoreBook
