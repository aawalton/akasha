import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theBuyingGame = {
  id: "01a0d5f2-db26-7394-b7ad-cc50a5b1cd6e",
  type: "page-type/temper-lore-book",
  slug: "the-buying-game",
  title: "The Buying Game",
  collection: "temper-lore-collection/houses-shops-and-trade",
  esoBookId: 793,
  bookIndex: 34,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
