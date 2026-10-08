import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const masteryOfWisdom = {
  id: "01a0d5f3-3fdb-760c-b8b0-a2a52d94b80d",
  type: "page-type/temper-lore-book",
  slug: "mastery-of-wisdom",
  title: "Mastery of Wisdom",
  collection: "temper-lore-collection/lore-and-culture",
  esoBookId: 2013,
  bookIndex: 86,
  charted: true,
  quest: 4959,
  positions: "jsonl",
  createdAt: "2026-09-25T00:24:43.739Z",
  updatedAt: "2026-09-25T00:24:45.000Z",
} as const satisfies TemperLoreBook
