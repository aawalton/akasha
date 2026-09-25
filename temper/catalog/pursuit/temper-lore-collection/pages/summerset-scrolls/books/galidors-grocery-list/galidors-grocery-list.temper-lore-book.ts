import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const galidorsGroceryList = {
  id: "01a0d60a-d5bc-78e6-a606-73d729e37ad9",
  type: "page-type/temper-lore-book",
  slug: "galidors-grocery-list",
  title: "Galidor's Grocery List",
  collection: "temper-lore-collection/summerset-scrolls",
  esoBookId: 4717,
  bookIndex: 64,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
