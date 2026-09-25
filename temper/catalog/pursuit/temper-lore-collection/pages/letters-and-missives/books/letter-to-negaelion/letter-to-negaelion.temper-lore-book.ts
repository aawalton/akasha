import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToNegaelion = {
  id: "01a0d5f3-0ef8-7955-8c07-b534180d17e8",
  type: "page-type/temper-lore-book",
  slug: "letter-to-negaelion",
  title: "Letter to Negaelion",
  collection: "temper-lore-collection/letters-and-missives",
  esoBookId: 3010,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
