import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const goldCoastGuidePartTwo = {
  id: "01a0d5f7-73fa-74e5-a71e-5a1905bcae15",
  type: "page-type/temper-lore-book",
  slug: "gold-coast-guide-part-two",
  title: "Gold Coast Guide, Part Two",
  collection: "temper-lore-collection/gold-coast-tomes",
  esoBookId: 3651,
  bookIndex: 65,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
