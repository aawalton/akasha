import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const nahliasJournal1 = {
  id: "01a0d60d-9a63-7174-99b1-9e1f518a3237",
  type: "page-type/temper-lore-book",
  slug: "nahlias-journal-1",
  title: "Nahlia's Journal 1",
  collection: "temper-lore-collection/scholarium-scribblings",
  esoBookId: 8165,
  bookIndex: 25,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
