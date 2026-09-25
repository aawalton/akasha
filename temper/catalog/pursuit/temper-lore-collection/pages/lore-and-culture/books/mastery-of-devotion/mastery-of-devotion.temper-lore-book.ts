import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const masteryOfDevotion = {
  id: "01a0d5f3-3fdb-7733-8879-204bf73ff266",
  type: "page-type/temper-lore-book",
  slug: "mastery-of-devotion",
  title: "Mastery of Devotion",
  collection: "temper-lore-collection/lore-and-culture",
  esoBookId: 2012,
  bookIndex: 85,
  charted: true,
  quest: 4959,
  positions: "jsonl",
} as const satisfies TemperLoreBook
