import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aDaughtersJournal = {
  id: "01a0d5f4-6f19-7794-b1ff-90cd6b3c3dd3",
  type: "page-type/temper-lore-book",
  slug: "a-daughters-journal",
  title: "A Daughter's Journal",
  collection: "temper-lore-collection/personal-journals",
  esoBookId: 2093,
  bookIndex: 85,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
