import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const legateMinutesConcerningGoblins = {
  id: "01a0d60b-fdb0-7d4f-ac92-f727628619b8",
  type: "page-type/temper-lore-book",
  slug: "legate-minutes-concerning-goblins",
  title: "Legate Minutes: Concerning Goblins",
  collection: "temper-lore-collection/books-of-blackwood",
  esoBookId: 6528,
  bookIndex: 72,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
