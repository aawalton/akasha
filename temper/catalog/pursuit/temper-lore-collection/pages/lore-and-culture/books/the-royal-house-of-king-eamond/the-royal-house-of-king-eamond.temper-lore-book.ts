import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theRoyalHouseOfKingEamond = {
  id: "01a0d5f3-3fdc-7d2a-b175-e805265d2f61",
  type: "page-type/temper-lore-book",
  slug: "the-royal-house-of-king-eamond",
  title: "The Royal House of King Eamond",
  collection: "temper-lore-collection/lore-and-culture",
  esoBookId: 1842,
  bookIndex: 81,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
