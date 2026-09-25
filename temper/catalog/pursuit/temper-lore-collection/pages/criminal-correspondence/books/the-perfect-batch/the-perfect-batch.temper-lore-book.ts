import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const thePerfectBatch = {
  id: "01a0d5f1-f452-7791-a83b-88a181c1cba0",
  type: "page-type/temper-lore-book",
  slug: "the-perfect-batch",
  title: "The Perfect Batch",
  collection: "temper-lore-collection/criminal-correspondence",
  esoBookId: 1517,
  bookIndex: 54,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
