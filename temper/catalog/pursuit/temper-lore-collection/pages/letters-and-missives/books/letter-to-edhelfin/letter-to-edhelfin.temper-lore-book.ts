import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToEdhelfin = {
  id: "01a0d5f3-0ef8-7a6c-b4cd-88d4f126f725",
  type: "page-type/temper-lore-book",
  slug: "letter-to-edhelfin",
  title: "Letter to Edhelfin",
  collection: "temper-lore-collection/letters-and-missives",
  esoBookId: 418,
  bookIndex: 7,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
