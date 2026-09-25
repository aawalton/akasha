import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const gjarmasOrdersWamasu = {
  id: "01a0d5f3-0ef7-7d23-8b92-c427343e79dd",
  type: "page-type/temper-lore-book",
  slug: "gjarmas-orders-wamasu",
  title: "Gjarma's Orders: Wamasu",
  collection: "temper-lore-collection/letters-and-missives",
  esoBookId: 951,
  charted: true,
  quest: 4396,
  positions: "jsonl",
} as const satisfies TemperLoreBook
