import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const noteOnTornParchment = {
  id: "01a0d5f2-509f-7f85-b2c5-5d9e385fae69",
  type: "page-type/temper-lore-book",
  slug: "note-on-torn-parchment",
  title: "Note on Torn Parchment",
  collection: "temper-lore-collection/diaries-and-logs",
  esoBookId: 105,
  bookIndex: 1,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
