import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const balkisInstructions = {
  id: "01a0d60c-75b4-740b-843d-378b7ee0d9b2",
  type: "page-type/temper-lore-book",
  slug: "balkis-instructions",
  title: "Balki's Instructions",
  collection: "temper-lore-collection/systres-tomes-and-scrolls",
  esoBookId: 7101,
  bookIndex: 50,
  charted: true,
  quest: 6792,
  positions: "jsonl",
} as const satisfies TemperLoreBook
