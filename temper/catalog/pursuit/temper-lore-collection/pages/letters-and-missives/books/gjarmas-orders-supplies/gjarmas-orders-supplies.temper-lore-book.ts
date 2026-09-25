import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const gjarmasOrdersSupplies = {
  id: "01a0d5f3-0ef7-7a0c-b9ff-4bead79bf067",
  type: "page-type/temper-lore-book",
  slug: "gjarmas-orders-supplies",
  title: "Gjarma's Orders: Supplies",
  collection: "temper-lore-collection/letters-and-missives",
  esoBookId: 950,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
