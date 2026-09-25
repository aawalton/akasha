import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToJakild = {
  id: "01a0d5f3-0ef8-7b53-8d0d-5be492461461",
  type: "page-type/temper-lore-book",
  slug: "letter-to-jakild",
  title: "Letter to Jakild",
  collection: "temper-lore-collection/letters-and-missives",
  esoBookId: 446,
  bookIndex: 9,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
