import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const masteryOfSacrifice = {
  id: "01a0d5f3-3fdb-7513-a42b-23e805b44197",
  type: "page-type/temper-lore-book",
  slug: "mastery-of-sacrifice",
  title: "Mastery of Sacrifice",
  collection: "temper-lore-collection/lore-and-culture",
  esoBookId: 2014,
  bookIndex: 87,
  charted: true,
  quest: 4959,
  positions: "jsonl",
} as const satisfies TemperLoreBook
