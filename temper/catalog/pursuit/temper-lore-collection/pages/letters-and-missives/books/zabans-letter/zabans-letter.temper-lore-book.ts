import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const zabansLetter = {
  id: "01a0d5f3-0ef9-7a0a-9b30-fd4b1df28cf6",
  type: "page-type/temper-lore-book",
  slug: "zabans-letter",
  title: "Zaban's Letter",
  collection: "temper-lore-collection/letters-and-missives",
  esoBookId: 833,
  bookIndex: 21,
  charted: true,
  quest: 4329,
  positions: "jsonl",
} as const satisfies TemperLoreBook
