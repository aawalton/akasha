import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const bothamulsOrders = {
  id: "01a0d5f3-0ef7-7c59-a8e2-cd9ca6fbd512",
  type: "page-type/temper-lore-book",
  slug: "bothamuls-orders",
  title: "Bothamul's Orders",
  collection: "temper-lore-collection/letters-and-missives",
  esoBookId: 4442,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
