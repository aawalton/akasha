import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const notThatBad = {
  id: "01a0d5f2-509f-7b1a-8e8d-03f62864240b",
  type: "page-type/temper-lore-book",
  slug: "not-that-bad",
  title: "Not That Bad",
  collection: "temper-lore-collection/diaries-and-logs",
  esoBookId: 1644,
  bookIndex: 44,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
