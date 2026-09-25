import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theGreenSinging = {
  id: "01a0d5f5-f3e5-7617-a541-ceb8817e979d",
  type: "page-type/temper-lore-book",
  slug: "the-green-singing",
  title: "The Green Singing",
  collection: "temper-lore-collection/the-world-and-its-creatures",
  esoBookId: 1310,
  bookIndex: 26,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
