import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const seekxiltsJournal = {
  id: "01a0d60d-708e-7a81-b8b3-c4bd34c794d0",
  type: "page-type/temper-lore-book",
  slug: "seekxilts-journal",
  title: "Seekxilts' Journal",
  collection: "temper-lore-collection/dungeon-delver-documents",
  esoBookId: 8477,
  bookIndex: 42,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
