import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aSubtlerBrew = {
  id: "01a0d5f2-db25-75ae-a037-64bb31883188",
  type: "page-type/temper-lore-book",
  slug: "a-subtler-brew",
  title: "A Subtler Brew",
  collection: "temper-lore-collection/houses-shops-and-trade",
  esoBookId: 2554,
  bookIndex: 80,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
