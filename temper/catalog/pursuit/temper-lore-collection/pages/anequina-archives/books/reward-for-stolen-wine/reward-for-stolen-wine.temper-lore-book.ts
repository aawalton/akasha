import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const rewardForStolenWine = {
  id: "01a0d60b-2345-745b-ae49-4b601f82f9e3",
  type: "page-type/temper-lore-book",
  slug: "reward-for-stolen-wine",
  title: "Reward for Stolen Wine",
  collection: "temper-lore-collection/anequina-archives",
  esoBookId: 5499,
  bookIndex: 10,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
