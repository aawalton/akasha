import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const hlakisJournal = {
  id: "01a0d5f6-45ad-75e7-a3ca-6d3a1497981c",
  type: "page-type/temper-lore-book",
  slug: "hlakis-journal",
  title: "Hlaki's Journal",
  collection: "temper-lore-collection/final-words",
  esoBookId: 850,
  bookIndex: 17,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
