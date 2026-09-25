import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const saroldosGreatestTreasure = {
  id: "01a0d5f7-4294-77bd-9a47-6d44a228bd57",
  type: "page-type/temper-lore-book",
  slug: "saroldos-greatest-treasure",
  title: "Saroldo's Greatest Treasure",
  collection: "temper-lore-collection/hews-bane-bookshelf",
  esoBookId: 3443,
  bookIndex: 34,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
