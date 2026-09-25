import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToFadeel = {
  id: "01a0d5f3-0ef8-7d64-ba55-330ea4268504",
  type: "page-type/temper-lore-book",
  slug: "letter-to-fadeel",
  title: "Letter to Fadeel",
  collection: "temper-lore-collection/letters-and-missives",
  esoBookId: 1395,
  bookIndex: 57,
  charted: true,
  quest: 4638,
  positions: "jsonl",
} as const satisfies TemperLoreBook
