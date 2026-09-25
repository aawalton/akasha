import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const darkestDivinities = {
  id: "01a0d5f6-1c15-70d2-bdb0-c21dd17e6bc0",
  type: "page-type/temper-lore-book",
  slug: "darkest-divinities",
  title: "Darkest Divinities",
  collection: "temper-lore-collection/words-of-the-poets",
  esoBookId: 554,
  bookIndex: 14,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
