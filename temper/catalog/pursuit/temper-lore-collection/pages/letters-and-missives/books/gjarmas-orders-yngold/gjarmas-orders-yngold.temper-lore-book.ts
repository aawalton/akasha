import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const gjarmasOrdersYngold = {
  id: "01a0d5f3-0ef7-7bea-881b-ad3f53585e8f",
  type: "page-type/temper-lore-book",
  slug: "gjarmas-orders-yngold",
  title: "Gjarma's Orders: Yngold",
  collection: "temper-lore-collection/letters-and-missives",
  esoBookId: 949,
  charted: true,
  quest: 4396,
  positions: "jsonl",
} as const satisfies TemperLoreBook
