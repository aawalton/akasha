import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const improvisedMemorial = {
  id: "01a0d5f8-02f8-7169-af1d-98858afbd1c6",
  type: "page-type/temper-lore-book",
  slug: "improvised-memorial",
  title: "Improvised Memorial",
  collection: "temper-lore-collection/library-of-incunabula",
  esoBookId: 4625,
  bookIndex: 17,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
