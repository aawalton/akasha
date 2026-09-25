import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterWithSingedEdges = {
  id: "01a0d5f4-c388-7c3d-87da-23c705e8376d",
  type: "page-type/temper-lore-book",
  slug: "letter-with-singed-edges",
  title: "Letter with Singed Edges",
  collection: "temper-lore-collection/plots-and-schemes",
  esoBookId: 581,
  bookIndex: 17,
  charted: true,
  quest: 4261,
  positions: "jsonl",
} as const satisfies TemperLoreBook
