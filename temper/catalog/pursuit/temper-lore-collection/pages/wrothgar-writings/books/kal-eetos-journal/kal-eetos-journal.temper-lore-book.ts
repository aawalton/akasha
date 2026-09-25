import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const kalEetosJournal = {
  id: "01a0d5f6-d68a-7220-87d3-f9c444a3a8e4",
  type: "page-type/temper-lore-book",
  slug: "kal-eetos-journal",
  title: "Kal-Eeto's Journal",
  collection: "temper-lore-collection/wrothgar-writings",
  esoBookId: 3025,
  bookIndex: 31,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
