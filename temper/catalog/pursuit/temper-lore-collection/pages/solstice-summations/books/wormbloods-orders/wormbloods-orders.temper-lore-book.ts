import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const wormbloodsOrders = {
  id: "01a0d60d-ff6a-793e-9e82-56fa8e342eaa",
  type: "page-type/temper-lore-book",
  slug: "wormbloods-orders",
  title: "Wormblood's Orders",
  collection: "temper-lore-collection/solstice-summations",
  esoBookId: 8305,
  bookIndex: 21,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
