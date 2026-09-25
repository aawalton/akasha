import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theBookOfCirclesForgingMaxims = {
  id: "01a0d5f6-6d42-7840-b618-1fec122a5717",
  type: "page-type/temper-lore-book",
  slug: "the-book-of-circles-forging-maxims",
  title: "The Book of Circles: Forging Maxims",
  collection: "temper-lore-collection/skill-books",
  esoBookId: 1649,
  bookIndex: 75,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
