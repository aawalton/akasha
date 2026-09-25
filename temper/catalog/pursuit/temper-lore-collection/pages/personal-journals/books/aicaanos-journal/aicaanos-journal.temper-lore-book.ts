import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aicaanosJournal = {
  id: "01a0d5f4-6f19-744b-be58-38330e369101",
  type: "page-type/temper-lore-book",
  slug: "aicaanos-journal",
  title: "Aicaano's Journal",
  collection: "temper-lore-collection/personal-journals",
  esoBookId: 2248,
  bookIndex: 90,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
