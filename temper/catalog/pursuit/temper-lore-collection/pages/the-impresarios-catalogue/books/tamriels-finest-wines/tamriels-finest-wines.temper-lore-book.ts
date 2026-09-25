import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const tamrielsFinestWines = {
  id: "01a0d60c-18bd-7799-95e3-cc0090df007f",
  type: "page-type/temper-lore-book",
  slug: "tamriels-finest-wines",
  title: "Tamriel's Finest Wines",
  collection: "temper-lore-collection/the-impresarios-catalogue",
  esoBookId: 6821,
  bookIndex: 4,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
