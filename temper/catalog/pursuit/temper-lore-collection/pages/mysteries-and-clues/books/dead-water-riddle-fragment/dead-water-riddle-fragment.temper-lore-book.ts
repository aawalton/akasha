import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const deadWaterRiddleFragment = {
  id: "01a0d5f4-07b7-740d-9645-104010b141c1",
  type: "page-type/temper-lore-book",
  slug: "dead-water-riddle-fragment",
  title: "Dead-Water Riddle Fragment",
  collection: "temper-lore-collection/mysteries-and-clues",
  esoBookId: 5203,
  bookIndex: 90,
  charted: true,
  quest: 6241,
  positions: "jsonl",
} as const satisfies TemperLoreBook
