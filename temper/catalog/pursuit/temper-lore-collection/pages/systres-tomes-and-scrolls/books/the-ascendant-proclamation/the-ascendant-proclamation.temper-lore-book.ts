import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theAscendantProclamation = {
  id: "01a0d60c-75b6-7761-a211-697712918ad5",
  type: "page-type/temper-lore-book",
  slug: "the-ascendant-proclamation",
  title: "The Ascendant Proclamation",
  collection: "temper-lore-collection/systres-tomes-and-scrolls",
  esoBookId: 6938,
  bookIndex: 20,
  charted: true,
  quest: 6752,
  positions: "jsonl",
} as const satisfies TemperLoreBook
