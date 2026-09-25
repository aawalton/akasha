import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const deathbringerOrders = {
  id: "01a0d5f4-3c11-7f6c-be17-d4522b1be992",
  type: "page-type/temper-lore-book",
  slug: "deathbringer-orders",
  title: "Deathbringer Orders",
  collection: "temper-lore-collection/notes-and-memos",
  esoBookId: 1652,
  bookIndex: 57,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
