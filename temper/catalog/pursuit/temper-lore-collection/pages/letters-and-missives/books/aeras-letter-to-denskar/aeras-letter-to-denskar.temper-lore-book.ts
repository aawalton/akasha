import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aerasLetterToDenskar = {
  id: "01a0d5f3-0ef7-7e73-9f60-82f66b5fabc6",
  type: "page-type/temper-lore-book",
  slug: "aeras-letter-to-denskar",
  title: "Aera's Letter to Denskar",
  collection: "temper-lore-collection/letters-and-missives",
  esoBookId: 1047,
  bookIndex: 32,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
