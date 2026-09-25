import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const merdyndrilsOrders = {
  id: "01a0d5f4-c388-78d5-b8ab-872879e6c5cb",
  type: "page-type/temper-lore-book",
  slug: "merdyndrils-orders",
  title: "Merdyndril's Orders",
  collection: "temper-lore-collection/plots-and-schemes",
  esoBookId: 737,
  bookIndex: 23,
  charted: true,
  quest: 3659,
  positions: "jsonl",
} as const satisfies TemperLoreBook
