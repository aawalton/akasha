import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theWayOfShadow = {
  id: "01a0d5f6-a29b-7081-ab77-4bf03ccc4fb5",
  type: "page-type/temper-lore-book",
  slug: "the-way-of-shadow",
  title: "The Way of Shadow",
  collection: "temper-lore-collection/lore-of-murkmire",
  esoBookId: 5371,
  bookIndex: 96,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
