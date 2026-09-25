import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const tummaMaxathsDiary = {
  id: "01a0d60b-fdb1-7c38-94ee-f72f81103b7e",
  type: "page-type/temper-lore-book",
  slug: "tumma-maxaths-diary",
  title: "Tumma-Maxath's Diary",
  collection: "temper-lore-collection/books-of-blackwood",
  esoBookId: 6502,
  bookIndex: 45,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
