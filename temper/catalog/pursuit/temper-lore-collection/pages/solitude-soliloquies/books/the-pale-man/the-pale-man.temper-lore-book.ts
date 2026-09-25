import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const thePaleMan = {
  id: "01a0d60b-8109-78aa-8583-54c6b52cfff6",
  type: "page-type/temper-lore-book",
  slug: "the-pale-man",
  title: "The Pale Man",
  collection: "temper-lore-collection/solitude-soliloquies",
  esoBookId: 6131,
  bookIndex: 9,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
