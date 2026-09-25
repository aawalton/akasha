import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theBastardsTomb = {
  id: "01a0d5f5-7767-7da2-989b-45781c20fe9f",
  type: "page-type/temper-lore-book",
  slug: "the-bastards-tomb",
  title: "The Bastard's Tomb",
  collection: "temper-lore-collection/tales-of-tamriel",
  esoBookId: 603,
  bookIndex: 14,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
