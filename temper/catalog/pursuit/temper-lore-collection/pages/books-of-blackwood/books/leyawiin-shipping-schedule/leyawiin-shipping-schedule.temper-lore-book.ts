import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const leyawiinShippingSchedule = {
  id: "01a0d60b-fdb0-7216-a2f4-c12a41949563",
  type: "page-type/temper-lore-book",
  slug: "leyawiin-shipping-schedule",
  title: "Leyawiin Shipping Schedule",
  collection: "temper-lore-collection/books-of-blackwood",
  esoBookId: 6674,
  bookIndex: 26,
  charted: true,
  quest: 6636,
  positions: "jsonl",
} as const satisfies TemperLoreBook
