import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToSeyne = {
  id: "01a0d5f3-0ef8-7e17-a913-d382cd62109c",
  type: "page-type/temper-lore-book",
  slug: "letter-to-seyne",
  title: "Letter to Seyne",
  collection: "temper-lore-collection/letters-and-missives",
  esoBookId: 343,
  bookIndex: 6,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
