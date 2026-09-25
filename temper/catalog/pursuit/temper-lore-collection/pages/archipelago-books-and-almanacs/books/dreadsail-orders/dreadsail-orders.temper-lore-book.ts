import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const dreadsailOrders = {
  id: "01a0d60c-baf3-7fab-88b2-75f7a9d22d17",
  type: "page-type/temper-lore-book",
  slug: "dreadsail-orders",
  title: "Dreadsail Orders",
  collection: "temper-lore-collection/archipelago-books-and-almanacs",
  esoBookId: 7284,
  bookIndex: 13,
  charted: true,
  quest: 6849,
  positions: "jsonl",
} as const satisfies TemperLoreBook
