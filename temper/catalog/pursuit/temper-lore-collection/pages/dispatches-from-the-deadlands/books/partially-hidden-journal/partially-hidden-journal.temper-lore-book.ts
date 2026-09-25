import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const partiallyHiddenJournal = {
  id: "01a0d60c-40c0-727b-9e1e-7e47d37cedf2",
  type: "page-type/temper-lore-book",
  slug: "partially-hidden-journal",
  title: "Partially Hidden Journal",
  collection: "temper-lore-collection/dispatches-from-the-deadlands",
  esoBookId: 6762,
  bookIndex: 18,
  charted: true,
  quest: 6696,
  positions: "jsonl",
} as const satisfies TemperLoreBook
