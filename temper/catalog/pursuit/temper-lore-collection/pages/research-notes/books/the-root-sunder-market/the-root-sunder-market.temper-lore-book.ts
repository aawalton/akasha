import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theRootSunderMarket = {
  id: "01a0d5f5-1386-777e-b54d-dfdbaace012f",
  type: "page-type/temper-lore-book",
  slug: "the-root-sunder-market",
  title: "The Root Sunder Market",
  collection: "temper-lore-collection/research-notes",
  esoBookId: 1039,
  bookIndex: 40,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
