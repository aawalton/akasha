import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const noPraiseForFalseGods = {
  id: "01a0d5f4-c388-761d-b856-7baddbf9553d",
  type: "page-type/temper-lore-book",
  slug: "no-praise-for-false-gods",
  title: "No Praise for False Gods",
  collection: "temper-lore-collection/plots-and-schemes",
  esoBookId: 1003,
  bookIndex: 30,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
