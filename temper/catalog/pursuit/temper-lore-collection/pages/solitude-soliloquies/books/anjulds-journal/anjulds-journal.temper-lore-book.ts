import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const anjuldsJournal = {
  id: "01a0d60b-8107-7186-bea7-4c581ddd32d1",
  type: "page-type/temper-lore-book",
  slug: "anjulds-journal",
  title: "Anjuld's Journal",
  collection: "temper-lore-collection/solitude-soliloquies",
  esoBookId: 6221,
  bookIndex: 62,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
