import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const memoriesLost = {
  id: "01a0d60d-156e-715b-b5ab-78cd8b58d539",
  type: "page-type/temper-lore-book",
  slug: "memories-lost",
  title: "Memories Lost",
  collection: "temper-lore-collection/apocryphal-pages",
  esoBookId: 7633,
  bookIndex: 3,
  charted: true,
  quest: 6975,
  positions: "jsonl",
} as const satisfies TemperLoreBook
