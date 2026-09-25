import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToMairrna = {
  id: "01a0d5f6-d68b-715a-9cfb-bafeb53efc59",
  type: "page-type/temper-lore-book",
  slug: "letter-to-mairrna",
  title: "Letter to Mairrna",
  collection: "temper-lore-collection/wrothgar-writings",
  esoBookId: 2750,
  bookIndex: 13,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
