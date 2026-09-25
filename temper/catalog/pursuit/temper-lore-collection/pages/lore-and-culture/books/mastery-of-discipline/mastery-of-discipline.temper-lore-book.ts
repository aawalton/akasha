import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const masteryOfDiscipline = {
  id: "01a0d5f3-3fdb-71a5-91a5-9dcfd36090e7",
  type: "page-type/temper-lore-book",
  slug: "mastery-of-discipline",
  title: "Mastery of Discipline",
  collection: "temper-lore-collection/lore-and-culture",
  esoBookId: 2011,
  bookIndex: 84,
  charted: true,
  quest: 4959,
  positions: "jsonl",
} as const satisfies TemperLoreBook
