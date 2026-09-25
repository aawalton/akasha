import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const wordsOfEntry = {
  id: "01a0d60b-8109-7671-bd7b-aba6da3b1573",
  type: "page-type/temper-lore-book",
  slug: "words-of-entry",
  title: "Words of Entry",
  collection: "temper-lore-collection/solitude-soliloquies",
  esoBookId: 6122,
  bookIndex: 77,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
