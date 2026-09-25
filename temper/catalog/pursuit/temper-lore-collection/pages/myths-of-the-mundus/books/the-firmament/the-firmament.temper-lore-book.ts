import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theFirmament = {
  id: "01a0d5e4-11d7-77a4-a506-4a168392f4dd",
  type: "page-type/temper-lore-book",
  slug: "the-firmament",
  title: "The Firmament",
  collection: "temper-lore-collection/myths-of-the-mundus",
  bookIndex: 6,
  shalidorPins: "jsonl",
} as const satisfies TemperLoreBook
