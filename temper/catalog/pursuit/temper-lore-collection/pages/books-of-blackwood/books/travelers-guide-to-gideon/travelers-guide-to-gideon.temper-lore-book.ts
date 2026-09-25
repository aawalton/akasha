import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const travelersGuideToGideon = {
  id: "01a0d60b-fdb1-77ef-87c1-23f441c9943b",
  type: "page-type/temper-lore-book",
  slug: "travelers-guide-to-gideon",
  title: "Traveler's Guide to Gideon",
  collection: "temper-lore-collection/books-of-blackwood",
  esoBookId: 6753,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
