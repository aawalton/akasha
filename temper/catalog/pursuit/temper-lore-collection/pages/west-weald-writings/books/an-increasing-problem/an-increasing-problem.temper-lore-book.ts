import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const anIncreasingProblem = {
  id: "01a0d60d-4aae-794a-b720-d6079afb45be",
  type: "page-type/temper-lore-book",
  slug: "an-increasing-problem",
  title: "An Increasing Problem",
  collection: "temper-lore-collection/west-weald-writings",
  esoBookId: 7888,
  bookIndex: 25,
  charted: true,
  quest: 7180,
  positions: "jsonl",
} as const satisfies TemperLoreBook
