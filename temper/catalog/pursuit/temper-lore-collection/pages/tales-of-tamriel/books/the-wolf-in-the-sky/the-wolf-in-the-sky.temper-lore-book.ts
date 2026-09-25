import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theWolfInTheSky = {
  id: "01a0d5f5-7768-7ab8-b648-6003e4261399",
  type: "page-type/temper-lore-book",
  slug: "the-wolf-in-the-sky",
  title: "The Wolf in the Sky",
  collection: "temper-lore-collection/tales-of-tamriel",
  esoBookId: 1366,
  bookIndex: 67,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
