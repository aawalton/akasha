import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const orderOfBattlePartial = {
  id: "01a0d5f3-7053-7f7e-9cf8-93423db69df0",
  type: "page-type/temper-lore-book",
  slug: "order-of-battle-partial",
  title: "Order of Battle (partial)",
  collection: "temper-lore-collection/military-orders-and-reports",
  esoBookId: 1462,
  bookIndex: 56,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
