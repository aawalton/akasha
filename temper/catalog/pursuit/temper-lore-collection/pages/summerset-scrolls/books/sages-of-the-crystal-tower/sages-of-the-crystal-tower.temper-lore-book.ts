import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const sagesOfTheCrystalTower = {
  id: "01a0d60a-d5bd-7a03-8ec3-b0a83a2f11cc",
  type: "page-type/temper-lore-book",
  slug: "sages-of-the-crystal-tower",
  title: "Sages of the Crystal Tower",
  collection: "temper-lore-collection/summerset-scrolls",
  esoBookId: 4813,
  bookIndex: 1,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
