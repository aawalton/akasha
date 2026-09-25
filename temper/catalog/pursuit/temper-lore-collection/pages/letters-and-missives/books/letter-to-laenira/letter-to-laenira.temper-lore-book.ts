import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToLaenira = {
  id: "01a0d5f3-0ef8-7d3a-be0c-935ae898fe94",
  type: "page-type/temper-lore-book",
  slug: "letter-to-laenira",
  title: "Letter to Laenira",
  collection: "temper-lore-collection/letters-and-missives",
  esoBookId: 2543,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
