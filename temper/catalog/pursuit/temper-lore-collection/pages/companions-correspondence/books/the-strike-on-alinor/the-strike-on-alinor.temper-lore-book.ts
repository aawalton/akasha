import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theStrikeOnAlinor = {
  id: "01a0d60d-bbe4-7c2c-8515-9c9a979d844f",
  type: "page-type/temper-lore-book",
  slug: "the-strike-on-alinor",
  title: "The Strike on Alinor",
  collection: "temper-lore-collection/companions-correspondence",
  esoBookId: 8070,
  bookIndex: 26,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
