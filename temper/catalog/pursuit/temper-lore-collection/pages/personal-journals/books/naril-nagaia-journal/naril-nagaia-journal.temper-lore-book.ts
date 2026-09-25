import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const narilNagaiaJournal = {
  id: "01a0d5f4-6f1b-7adf-9e80-65089a4f686e",
  type: "page-type/temper-lore-book",
  slug: "naril-nagaia-journal",
  title: "Naril Nagaia Journal",
  collection: "temper-lore-collection/personal-journals",
  esoBookId: 1908,
  bookIndex: 77,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
