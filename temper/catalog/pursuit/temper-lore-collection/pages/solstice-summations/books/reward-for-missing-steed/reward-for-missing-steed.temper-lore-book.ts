import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const rewardForMissingSteed = {
  id: "01a0d60d-ff6a-7316-8759-e2baa919c372",
  type: "page-type/temper-lore-book",
  slug: "reward-for-missing-steed",
  title: "Reward for Missing Steed!",
  collection: "temper-lore-collection/solstice-summations",
  esoBookId: 8517,
  bookIndex: 81,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
