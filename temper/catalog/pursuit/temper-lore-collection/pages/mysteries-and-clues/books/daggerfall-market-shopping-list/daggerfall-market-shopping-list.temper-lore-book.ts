import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const daggerfallMarketShoppingList = {
  id: "01a0d5f4-07b7-72c8-8416-06e3ea165529",
  type: "page-type/temper-lore-book",
  slug: "daggerfall-market-shopping-list",
  title: "Daggerfall Market Shopping List",
  collection: "temper-lore-collection/mysteries-and-clues",
  esoBookId: 891,
  bookIndex: 18,
  charted: true,
  quest: 3000,
  positions: "jsonl",
} as const satisfies TemperLoreBook
