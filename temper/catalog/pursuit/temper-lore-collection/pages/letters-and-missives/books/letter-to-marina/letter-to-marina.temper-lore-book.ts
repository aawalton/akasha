import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToMarina = {
  id: "01a0d5f3-0ef8-768e-bc25-69f0922da626",
  type: "page-type/temper-lore-book",
  slug: "letter-to-marina",
  title: "Letter to Marina",
  collection: "temper-lore-collection/letters-and-missives",
  esoBookId: 2182,
  bookIndex: 88,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
