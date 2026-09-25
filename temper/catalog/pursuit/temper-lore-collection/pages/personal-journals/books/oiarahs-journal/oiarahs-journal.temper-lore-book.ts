import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const oiarahsJournal = {
  id: "01a0d5f4-6f1b-7289-9448-f40ccef40e0d",
  type: "page-type/temper-lore-book",
  slug: "oiarahs-journal",
  title: "Oiarah's Journal",
  collection: "temper-lore-collection/personal-journals",
  esoBookId: 1294,
  bookIndex: 55,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
