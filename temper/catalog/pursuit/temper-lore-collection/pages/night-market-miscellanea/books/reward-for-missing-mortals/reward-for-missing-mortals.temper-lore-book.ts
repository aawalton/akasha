import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const rewardForMissingMortals = {
  id: "01a0d60e-687f-7449-a450-15c832d7cc39",
  type: "page-type/temper-lore-book",
  slug: "reward-for-missing-mortals",
  title: "Reward for Missing Mortals",
  collection: "temper-lore-collection/night-market-miscellanea",
  esoBookId: 8631,
  bookIndex: 1,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
