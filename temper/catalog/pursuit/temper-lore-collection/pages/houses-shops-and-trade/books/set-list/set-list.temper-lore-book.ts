import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const setList = {
  id: "01a0d5f2-db26-7bf7-a1ec-39fd09336200",
  type: "page-type/temper-lore-book",
  slug: "set-list",
  title: "Set List",
  collection: "temper-lore-collection/houses-shops-and-trade",
  esoBookId: 1928,
  bookIndex: 75,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
