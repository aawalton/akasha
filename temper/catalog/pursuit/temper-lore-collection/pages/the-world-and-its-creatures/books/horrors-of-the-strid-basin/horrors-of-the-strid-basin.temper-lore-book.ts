import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const horrorsOfTheStridBasin = {
  id: "01a0d5f5-f3e4-7ae2-8805-d46ebec90c03",
  type: "page-type/temper-lore-book",
  slug: "horrors-of-the-strid-basin",
  title: "Horrors of the Strid Basin",
  collection: "temper-lore-collection/the-world-and-its-creatures",
  esoBookId: 1077,
  bookIndex: 22,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
