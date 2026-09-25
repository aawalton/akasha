import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const foodItemListForTravel = {
  id: "01a0d60b-a361-79f7-a41a-68f945cb6eaa",
  type: "page-type/temper-lore-book",
  slug: "food-item-list-for-travel",
  title: "Food Item List for Travel",
  collection: "temper-lore-collection/western-skyrim-register",
  esoBookId: 6243,
  bookIndex: 37,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
