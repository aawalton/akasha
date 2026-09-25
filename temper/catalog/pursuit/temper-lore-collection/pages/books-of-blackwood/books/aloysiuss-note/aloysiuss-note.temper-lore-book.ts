import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aloysiussNote = {
  id: "01a0d60b-fdaf-7146-907a-ad4c01a2ecb7",
  type: "page-type/temper-lore-book",
  slug: "aloysiuss-note",
  title: "Aloysius's Note",
  collection: "temper-lore-collection/books-of-blackwood",
  esoBookId: 6520,
  bookIndex: 60,
  charted: true,
  quest: 6647,
  positions: "jsonl",
} as const satisfies TemperLoreBook
