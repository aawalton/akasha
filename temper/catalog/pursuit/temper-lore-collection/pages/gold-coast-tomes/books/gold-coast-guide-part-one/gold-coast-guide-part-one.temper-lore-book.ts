import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const goldCoastGuidePartOne = {
  id: "01a0d5f7-73fa-7897-99e7-318e0c2c0c19",
  type: "page-type/temper-lore-book",
  slug: "gold-coast-guide-part-one",
  title: "Gold Coast Guide, Part One",
  collection: "temper-lore-collection/gold-coast-tomes",
  esoBookId: 3650,
  bookIndex: 64,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
