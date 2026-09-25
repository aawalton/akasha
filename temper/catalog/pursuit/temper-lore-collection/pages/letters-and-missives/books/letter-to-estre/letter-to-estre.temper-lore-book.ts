import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToEstre = {
  id: "01a0d5f3-0ef8-71bc-8bdf-75f66dbccf89",
  type: "page-type/temper-lore-book",
  slug: "letter-to-estre",
  title: "Letter to Estre",
  collection: "temper-lore-collection/letters-and-missives",
  esoBookId: 638,
  bookIndex: 15,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
