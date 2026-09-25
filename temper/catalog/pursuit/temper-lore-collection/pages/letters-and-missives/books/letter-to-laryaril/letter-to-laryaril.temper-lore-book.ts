import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToLaryaril = {
  id: "01a0d5f3-0ef8-7b27-bb88-18e580f90aa6",
  type: "page-type/temper-lore-book",
  slug: "letter-to-laryaril",
  title: "Letter to Laryaril",
  collection: "temper-lore-collection/letters-and-missives",
  esoBookId: 1364,
  bookIndex: 55,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
