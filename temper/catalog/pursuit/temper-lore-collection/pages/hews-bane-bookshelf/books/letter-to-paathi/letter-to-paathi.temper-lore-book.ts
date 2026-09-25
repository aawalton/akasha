import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToPaathi = {
  id: "01a0d5f7-4293-7a87-ab6f-f7177b274be6",
  type: "page-type/temper-lore-book",
  slug: "letter-to-paathi",
  title: "Letter to Paathi",
  collection: "temper-lore-collection/hews-bane-bookshelf",
  esoBookId: 3237,
  bookIndex: 1,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
