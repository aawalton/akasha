import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const oathbreakersRest = {
  id: "01a0d5f3-3fdb-77ec-9e8d-3aae86bbf4af",
  type: "page-type/temper-lore-book",
  slug: "oathbreakers-rest",
  title: "Oathbreakers' Rest",
  collection: "temper-lore-collection/lore-and-culture",
  esoBookId: 595,
  bookIndex: 8,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
