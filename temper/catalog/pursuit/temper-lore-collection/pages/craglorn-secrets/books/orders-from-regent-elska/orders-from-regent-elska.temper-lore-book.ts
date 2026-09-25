import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const ordersFromRegentElska = {
  id: "01a0d5f1-c91b-70fb-bb23-dccacfb23583",
  type: "page-type/temper-lore-book",
  slug: "orders-from-regent-elska",
  title: "Orders from Regent Elska",
  collection: "temper-lore-collection/craglorn-secrets",
  esoBookId: 2693,
  bookIndex: 79,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
