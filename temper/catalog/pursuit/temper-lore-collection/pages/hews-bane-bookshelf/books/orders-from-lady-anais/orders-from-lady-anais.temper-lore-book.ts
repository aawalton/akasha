import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const ordersFromLadyAnais = {
  id: "01a0d5f7-4294-743a-a52e-44a660b4ca1d",
  type: "page-type/temper-lore-book",
  slug: "orders-from-lady-anais",
  title: "Orders from Lady Anais",
  collection: "temper-lore-collection/hews-bane-bookshelf",
  esoBookId: 3339,
  bookIndex: 60,
  charted: true,
  quest: 5570,
  positions: "jsonl",
} as const satisfies TemperLoreBook
