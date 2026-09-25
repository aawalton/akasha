import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aPrayerForMyFamily = {
  id: "01a0d5f2-af6f-7e6a-b996-99ce4a945a1f",
  type: "page-type/temper-lore-book",
  slug: "a-prayer-for-my-family",
  title: "A Prayer for My Family",
  collection: "temper-lore-collection/hearts-and-flowers",
  esoBookId: 993,
  bookIndex: 29,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
