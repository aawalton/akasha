import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const hymnToKyne = {
  id: "01a0d5f6-1c15-7660-aa83-2718823da278",
  type: "page-type/temper-lore-book",
  slug: "hymn-to-kyne",
  title: "Hymn to Kyne",
  collection: "temper-lore-collection/words-of-the-poets",
  esoBookId: 151,
  bookIndex: 1,
  charted: true,
  quest: 4030,
  positions: "jsonl",
} as const satisfies TemperLoreBook
