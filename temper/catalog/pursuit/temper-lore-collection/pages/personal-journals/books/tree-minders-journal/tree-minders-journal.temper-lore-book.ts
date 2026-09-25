import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const treeMindersJournal = {
  id: "01a0d5f4-6f1b-7798-ba79-0e0e680f3e7c",
  type: "page-type/temper-lore-book",
  slug: "tree-minders-journal",
  title: "Tree-Minder's Journal",
  collection: "temper-lore-collection/personal-journals",
  esoBookId: 129,
  bookIndex: 2,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
