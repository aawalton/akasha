import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theTerrorsOrders = {
  id: "01a0d60d-4ab0-7847-b301-7393ea7eebe9",
  type: "page-type/temper-lore-book",
  slug: "the-terrors-orders",
  title: "The Terror's Orders",
  collection: "temper-lore-collection/west-weald-writings",
  esoBookId: 7854,
  bookIndex: 28,
  charted: true,
  quest: 7090,
  positions: "jsonl",
} as const satisfies TemperLoreBook
