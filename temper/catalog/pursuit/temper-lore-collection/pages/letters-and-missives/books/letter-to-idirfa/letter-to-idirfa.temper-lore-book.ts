import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToIdirfa = {
  id: "01a0d5f3-0ef8-7f82-97a7-3c327e3ee8b0",
  type: "page-type/temper-lore-book",
  slug: "letter-to-idirfa",
  title: "Letter to Idirfa",
  collection: "temper-lore-collection/letters-and-missives",
  esoBookId: 1333,
  bookIndex: 50,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
