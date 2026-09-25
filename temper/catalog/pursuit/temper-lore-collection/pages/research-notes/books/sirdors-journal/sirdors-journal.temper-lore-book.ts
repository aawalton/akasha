import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const sirdorsJournal = {
  id: "01a0d5f5-1385-7146-9dec-13984ec19b9d",
  type: "page-type/temper-lore-book",
  slug: "sirdors-journal",
  title: "Sirdor's Journal",
  collection: "temper-lore-collection/research-notes",
  esoBookId: 948,
  bookIndex: 37,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
