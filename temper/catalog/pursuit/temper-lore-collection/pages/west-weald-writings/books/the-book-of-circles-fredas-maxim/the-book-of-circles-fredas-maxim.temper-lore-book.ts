import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theBookOfCirclesFredasMaxim = {
  id: "01a0d60d-4ab0-79be-9009-458282784999",
  type: "page-type/temper-lore-book",
  slug: "the-book-of-circles-fredas-maxim",
  title: "The Book of Circles, Fredas Maxim",
  collection: "temper-lore-collection/west-weald-writings",
  esoBookId: 7790,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
