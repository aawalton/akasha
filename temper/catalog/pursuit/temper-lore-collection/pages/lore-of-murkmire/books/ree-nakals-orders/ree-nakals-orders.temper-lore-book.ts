import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const reeNakalsOrders = {
  id: "01a0d5f6-a29a-7c6c-80c5-327ac9cdf168",
  type: "page-type/temper-lore-book",
  slug: "ree-nakals-orders",
  title: "Ree-Nakal's Orders",
  collection: "temper-lore-collection/lore-of-murkmire",
  esoBookId: 5197,
  bookIndex: 64,
  charted: true,
  quest: 6258,
  positions: "jsonl",
} as const satisfies TemperLoreBook
