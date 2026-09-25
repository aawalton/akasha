import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theScaledElves = {
  id: "01a0d60a-d5be-7775-ad17-d8cd97696691",
  type: "page-type/temper-lore-book",
  slug: "the-scaled-elves",
  title: "The Scaled Elves",
  collection: "temper-lore-collection/summerset-scrolls",
  esoBookId: 5106,
  charted: true,
  quest: 6131,
  positions: "jsonl",
} as const satisfies TemperLoreBook
