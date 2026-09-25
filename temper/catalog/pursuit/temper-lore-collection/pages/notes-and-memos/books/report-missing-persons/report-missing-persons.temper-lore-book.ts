import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const reportMissingPersons = {
  id: "01a0d5f4-3c13-7a71-aa22-0c8790c23aa9",
  type: "page-type/temper-lore-book",
  slug: "report-missing-persons",
  title: "Report: Missing Persons",
  collection: "temper-lore-collection/notes-and-memos",
  esoBookId: 406,
  bookIndex: 6,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
