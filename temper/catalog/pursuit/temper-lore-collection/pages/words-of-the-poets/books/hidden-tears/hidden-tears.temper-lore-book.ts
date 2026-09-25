import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const hiddenTears = {
  id: "01a0d5f6-1c15-7268-84ec-b90a48567be1",
  type: "page-type/temper-lore-book",
  slug: "hidden-tears",
  title: "Hidden Tears",
  collection: "temper-lore-collection/words-of-the-poets",
  esoBookId: 922,
  bookIndex: 29,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
