import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToPercyVelmont = {
  id: "01a0d5f7-4293-7108-aadc-66256560eb88",
  type: "page-type/temper-lore-book",
  slug: "letter-to-percy-velmont",
  title: "Letter to Percy Velmont",
  collection: "temper-lore-collection/hews-bane-bookshelf",
  esoBookId: 3338,
  bookIndex: 59,
  charted: true,
  quest: 5570,
  positions: "jsonl",
} as const satisfies TemperLoreBook
