import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const pircalmosShoppingList = {
  id: "01a0d5f2-db26-7388-97a3-39d54d27cc5a",
  type: "page-type/temper-lore-book",
  slug: "pircalmos-shopping-list",
  title: "Pircalmo's Shopping List",
  collection: "temper-lore-collection/houses-shops-and-trade",
  esoBookId: 1642,
  bookIndex: 57,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
