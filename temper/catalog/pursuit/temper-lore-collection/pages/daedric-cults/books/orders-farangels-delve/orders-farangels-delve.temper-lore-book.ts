import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const ordersFarangelsDelve = {
  id: "01a0d5f2-253b-7ca5-9a5a-bf98137fbe00",
  type: "page-type/temper-lore-book",
  slug: "orders-farangels-delve",
  title: "Orders: Farangel's Delve",
  collection: "temper-lore-collection/daedric-cults",
  esoBookId: 91,
  bookIndex: 4,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
