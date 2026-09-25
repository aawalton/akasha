import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToBelya = {
  id: "01a0d5f3-0ef8-7824-8d0e-8fd69093ff78",
  type: "page-type/temper-lore-book",
  slug: "letter-to-belya",
  title: "Letter to Belya",
  collection: "temper-lore-collection/letters-and-missives",
  esoBookId: 1756,
  bookIndex: 67,
  charted: true,
  quest: 4691,
  positions: "jsonl",
} as const satisfies TemperLoreBook
