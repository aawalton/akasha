import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const masterShelrenisOrders = {
  id: "01a0d60c-eb9b-76d3-bab6-a97ced4d7e33",
  type: "page-type/temper-lore-book",
  slug: "master-shelrenis-orders",
  title: "Master Shelreni's Orders",
  collection: "temper-lore-collection/telvanni-tomes",
  esoBookId: 7611,
  bookIndex: 8,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
