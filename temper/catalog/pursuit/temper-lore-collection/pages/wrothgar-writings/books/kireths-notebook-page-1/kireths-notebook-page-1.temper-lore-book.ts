import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const kirethsNotebookPage1 = {
  id: "01a0d5f6-d68b-73ba-bf1e-197ec8039d39",
  type: "page-type/temper-lore-book",
  slug: "kireths-notebook-page-1",
  title: "Kireth's Notebook, Page 1",
  collection: "temper-lore-collection/wrothgar-writings",
  esoBookId: 2737,
  bookIndex: 51,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
