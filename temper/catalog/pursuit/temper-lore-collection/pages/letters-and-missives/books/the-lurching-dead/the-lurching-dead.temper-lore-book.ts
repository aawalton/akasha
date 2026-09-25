import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theLurchingDead = {
  id: "01a0d5f3-0ef8-7239-88b2-fcdf114c2f39",
  type: "page-type/temper-lore-book",
  slug: "the-lurching-dead",
  title: "The Lurching Dead",
  collection: "temper-lore-collection/letters-and-missives",
  esoBookId: 2465,
  bookIndex: 94,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
