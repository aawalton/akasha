import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const boethiahsCallOfChampions = {
  id: "01a0d5f2-83a2-7d3b-a46a-2d0c028c1738",
  type: "page-type/temper-lore-book",
  slug: "boethiahs-call-of-champions",
  title: "Boethiah's Call of Champions",
  collection: "temper-lore-collection/handbills-posters-and-decrees",
  esoBookId: 2747,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
