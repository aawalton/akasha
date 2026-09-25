import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const courierGreniersNote = {
  id: "01a0d60c-75b4-7fba-8d55-b4a420720240",
  type: "page-type/temper-lore-book",
  slug: "courier-greniers-note",
  title: "Courier Grenier's Note",
  collection: "temper-lore-collection/systres-tomes-and-scrolls",
  esoBookId: 6966,
  bookIndex: 23,
  charted: true,
  quest: 6753,
  positions: "jsonl",
} as const satisfies TemperLoreBook
