import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const journeyToEndings = {
  id: "01a0d60b-2345-72fc-9106-51f17a7c017e",
  type: "page-type/temper-lore-book",
  slug: "journey-to-endings",
  title: "Journey to Endings",
  collection: "temper-lore-collection/anequina-archives",
  esoBookId: 5489,
  bookIndex: 30,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
