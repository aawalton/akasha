import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theBladeOfWoe = {
  id: "01a0d5f7-73fb-75bd-995a-0df7395aed1d",
  type: "page-type/temper-lore-book",
  slug: "the-blade-of-woe",
  title: "The Blade of Woe",
  collection: "temper-lore-collection/gold-coast-tomes",
  esoBookId: 3719,
  bookIndex: 44,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
