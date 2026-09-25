import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theLegendaryScourge = {
  id: "01a0d5e3-e98c-7419-aae6-5699ab5a04a6",
  type: "page-type/temper-lore-book",
  slug: "the-legendary-scourge",
  title: "The Legendary Scourge",
  collection: "temper-lore-collection/literature",
  bookIndex: 2,
  shalidorPins: "jsonl",
} as const satisfies TemperLoreBook
