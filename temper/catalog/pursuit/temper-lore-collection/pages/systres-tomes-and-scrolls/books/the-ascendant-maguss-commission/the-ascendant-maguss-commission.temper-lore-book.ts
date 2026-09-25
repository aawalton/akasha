import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theAscendantMagussCommission = {
  id: "01a0d60c-75b6-7954-9e35-62bbfe566be6",
  type: "page-type/temper-lore-book",
  slug: "the-ascendant-maguss-commission",
  title: "The Ascendant Magus's Commission",
  collection: "temper-lore-collection/systres-tomes-and-scrolls",
  esoBookId: 7031,
  bookIndex: 36,
  charted: true,
  quest: 6765,
  positions: "jsonl",
} as const satisfies TemperLoreBook
