import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const pickingUpThePieces = {
  id: "01a0d5f8-02f9-7ef1-bb68-6df4f552e12d",
  type: "page-type/temper-lore-book",
  slug: "picking-up-the-pieces",
  title: "Picking up the Pieces",
  collection: "temper-lore-collection/library-of-incunabula",
  esoBookId: 5474,
  bookIndex: 51,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
