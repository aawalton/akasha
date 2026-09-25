import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const regardingTheFistsOfThalmor = {
  id: "01a0d5f3-0ef8-7b9d-a2d8-b45c910e1e07",
  type: "page-type/temper-lore-book",
  slug: "regarding-the-fists-of-thalmor",
  title: 'Regarding the "Fists of Thalmor"',
  collection: "temper-lore-collection/letters-and-missives",
  esoBookId: 1962,
  bookIndex: 82,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
