import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const seriensAdditionalOrders = {
  id: "01a0d5f3-7054-7cfb-97a7-5dca0f3c3128",
  type: "page-type/temper-lore-book",
  slug: "seriens-additional-orders",
  title: "Serien's Additional Orders",
  collection: "temper-lore-collection/military-orders-and-reports",
  esoBookId: 310,
  bookIndex: 11,
  charted: true,
  quest: 3583,
  positions: "jsonl",
} as const satisfies TemperLoreBook
