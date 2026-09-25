import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const guideToTamingDireWolves = {
  id: "01a0d5f7-73fa-7dd7-bee7-78199b9a15c6",
  type: "page-type/temper-lore-book",
  slug: "guide-to-taming-dire-wolves",
  title: "Guide to Taming Dire Wolves",
  collection: "temper-lore-collection/gold-coast-tomes",
  esoBookId: 3644,
  bookIndex: 49,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
