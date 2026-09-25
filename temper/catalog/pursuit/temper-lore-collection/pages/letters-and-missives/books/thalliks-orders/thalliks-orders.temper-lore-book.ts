import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const thalliksOrders = {
  id: "01a0d5f3-0ef8-71bd-85e6-f4db4fcf6d3e",
  type: "page-type/temper-lore-book",
  slug: "thalliks-orders",
  title: "Thallik's Orders",
  collection: "temper-lore-collection/letters-and-missives",
  esoBookId: 2534,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
