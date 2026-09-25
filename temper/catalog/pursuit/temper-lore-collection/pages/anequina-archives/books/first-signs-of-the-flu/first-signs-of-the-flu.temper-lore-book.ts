import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const firstSignsOfTheFlu = {
  id: "01a0d60b-2344-72ba-9244-f8b4c3a692e4",
  type: "page-type/temper-lore-book",
  slug: "first-signs-of-the-flu",
  title: "First Signs of the Flu",
  collection: "temper-lore-collection/anequina-archives",
  esoBookId: 5466,
  bookIndex: 6,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
