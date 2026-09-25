import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const sweetLife = {
  id: "01a0d5f2-af70-7864-aef2-6723c2136474",
  type: "page-type/temper-lore-book",
  slug: "sweet-life",
  title: "Sweet Life",
  collection: "temper-lore-collection/hearts-and-flowers",
  esoBookId: 787,
  bookIndex: 23,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
