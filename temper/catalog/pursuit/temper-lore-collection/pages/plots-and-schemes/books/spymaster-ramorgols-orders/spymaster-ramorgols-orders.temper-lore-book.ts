import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const spymasterRamorgolsOrders = {
  id: "01a0d5f4-c389-7e83-a53d-5a3822c73ed0",
  type: "page-type/temper-lore-book",
  slug: "spymaster-ramorgols-orders",
  title: "Spymaster Ramorgol's Orders",
  collection: "temper-lore-collection/plots-and-schemes",
  esoBookId: 1287,
  bookIndex: 46,
  charted: true,
  quest: 4070,
  positions: "jsonl",
} as const satisfies TemperLoreBook
