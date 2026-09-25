import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theLiberationOfLeyawiin = {
  id: "01a0d60b-fdb1-7ef4-a1f1-b731cbf17447",
  type: "page-type/temper-lore-book",
  slug: "the-liberation-of-leyawiin",
  title: "The Liberation of Leyawiin",
  collection: "temper-lore-collection/books-of-blackwood",
  esoBookId: 6687,
  bookIndex: 39,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
