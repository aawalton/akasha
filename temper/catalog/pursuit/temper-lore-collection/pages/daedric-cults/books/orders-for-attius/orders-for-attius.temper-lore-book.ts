import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const ordersForAttius = {
  id: "01a0d5f2-253b-7877-b58e-f0108eafc6f1",
  type: "page-type/temper-lore-book",
  slug: "orders-for-attius",
  title: "Orders for Attius",
  collection: "temper-lore-collection/daedric-cults",
  esoBookId: 2082,
  bookIndex: 71,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
