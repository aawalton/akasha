import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theHouseOfTroubles = {
  id: "01a0d5e3-6b61-7aef-9caa-bee4ca1980be",
  type: "page-type/temper-lore-book",
  slug: "the-house-of-troubles",
  title: "The House of Troubles",
  collection: "temper-lore-collection/daedric-princes",
  bookIndex: 4,
  shalidorPins: "jsonl",
} as const satisfies TemperLoreBook
