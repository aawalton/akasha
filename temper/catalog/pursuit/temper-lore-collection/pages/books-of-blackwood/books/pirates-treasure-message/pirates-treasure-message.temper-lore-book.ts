import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const piratesTreasureMessage = {
  id: "01a0d60b-fdb0-71e1-9e81-d3a567cbe8c2",
  type: "page-type/temper-lore-book",
  slug: "pirates-treasure-message",
  title: "Pirate's Treasure Message",
  collection: "temper-lore-collection/books-of-blackwood",
  esoBookId: 6688,
  bookIndex: 94,
  charted: true,
  quest: 6670,
  positions: "jsonl",
} as const satisfies TemperLoreBook
