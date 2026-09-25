import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterFromGabbi = {
  id: "01a0d5f3-0ef7-7500-9973-2993a3599240",
  type: "page-type/temper-lore-book",
  slug: "letter-from-gabbi",
  title: "Letter from Gabbi",
  collection: "temper-lore-collection/letters-and-missives",
  esoBookId: 445,
  bookIndex: 8,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
