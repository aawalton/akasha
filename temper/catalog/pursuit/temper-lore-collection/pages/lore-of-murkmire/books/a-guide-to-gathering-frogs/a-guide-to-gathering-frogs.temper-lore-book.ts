import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aGuideToGatheringFrogs = {
  id: "01a0d5f6-a298-70b6-bf75-6cde5468f756",
  type: "page-type/temper-lore-book",
  slug: "a-guide-to-gathering-frogs",
  title: "A Guide to Gathering Frogs",
  collection: "temper-lore-collection/lore-of-murkmire",
  esoBookId: 5200,
  bookIndex: 50,
  charted: true,
  quest: 6265,
  positions: "jsonl",
} as const satisfies TemperLoreBook
