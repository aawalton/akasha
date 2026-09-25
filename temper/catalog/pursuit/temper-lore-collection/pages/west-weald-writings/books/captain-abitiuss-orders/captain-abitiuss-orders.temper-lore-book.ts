import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const captainAbitiussOrders = {
  id: "01a0d60d-4aae-774b-98d6-0bbe360a04d4",
  type: "page-type/temper-lore-book",
  slug: "captain-abitiuss-orders",
  title: "Captain Abitius's Orders",
  collection: "temper-lore-collection/west-weald-writings",
  esoBookId: 7819,
  bookIndex: 61,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
