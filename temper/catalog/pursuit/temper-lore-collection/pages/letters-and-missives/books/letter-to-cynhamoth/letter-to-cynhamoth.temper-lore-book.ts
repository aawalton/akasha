import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToCynhamoth = {
  id: "01a0d5f3-0ef8-76d9-8be2-7832b563b3be",
  type: "page-type/temper-lore-book",
  slug: "letter-to-cynhamoth",
  title: "Letter to Cynhamoth",
  collection: "temper-lore-collection/letters-and-missives",
  esoBookId: 2522,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
