import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterHome = {
  id: "01a0d5f3-0ef7-7196-b88d-0fe9794384ef",
  type: "page-type/temper-lore-book",
  slug: "letter-home",
  title: "Letter Home",
  collection: "temper-lore-collection/letters-and-missives",
  esoBookId: 866,
  bookIndex: 22,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
