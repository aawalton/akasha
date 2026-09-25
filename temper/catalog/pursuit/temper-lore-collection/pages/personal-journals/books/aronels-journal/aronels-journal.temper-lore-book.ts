import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aronelsJournal = {
  id: "01a0d5f4-6f19-71e8-9b98-9c58fbfe7b2d",
  type: "page-type/temper-lore-book",
  slug: "aronels-journal",
  title: "Aronel's Journal",
  collection: "temper-lore-collection/personal-journals",
  esoBookId: 1011,
  bookIndex: 40,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
