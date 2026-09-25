import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aSailorsGuideToSeaElves = {
  id: "01a0d60a-d5bc-7a45-9bcd-1915b7be99d5",
  type: "page-type/temper-lore-book",
  slug: "a-sailors-guide-to-sea-elves",
  title: "A Sailor's Guide to Sea Elves",
  collection: "temper-lore-collection/summerset-scrolls",
  esoBookId: 5113,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
