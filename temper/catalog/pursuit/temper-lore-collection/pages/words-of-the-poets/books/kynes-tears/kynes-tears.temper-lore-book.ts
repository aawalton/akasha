import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const kynesTears = {
  id: "01a0d5f6-1c16-712d-b11d-8fa32eacc12d",
  type: "page-type/temper-lore-book",
  slug: "kynes-tears",
  title: "Kyne's Tears",
  collection: "temper-lore-collection/words-of-the-poets",
  esoBookId: 921,
  bookIndex: 28,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
