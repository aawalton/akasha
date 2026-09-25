import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToAndo = {
  id: "01a0d5f1-f451-700b-b0a8-cdf4b248ae07",
  type: "page-type/temper-lore-book",
  slug: "letter-to-ando",
  title: "Letter to Ando",
  collection: "temper-lore-collection/criminal-correspondence",
  esoBookId: 1266,
  bookIndex: 45,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
