import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const careAndFeedingOfSwampJellies = {
  id: "01a0d5f6-a298-72c3-848e-07af614c3001",
  type: "page-type/temper-lore-book",
  slug: "care-and-feeding-of-swamp-jellies",
  title: "Care and Feeding of Swamp Jellies",
  collection: "temper-lore-collection/lore-of-murkmire",
  esoBookId: 5303,
  bookIndex: 60,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
