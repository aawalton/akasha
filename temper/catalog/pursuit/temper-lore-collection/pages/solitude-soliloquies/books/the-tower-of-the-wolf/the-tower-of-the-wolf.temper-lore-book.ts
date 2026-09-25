import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theTowerOfTheWolf = {
  id: "01a0d60b-8109-7bb9-9f2f-1c27e999a26c",
  type: "page-type/temper-lore-book",
  slug: "the-tower-of-the-wolf",
  title: "The Tower of the Wolf",
  collection: "temper-lore-collection/solitude-soliloquies",
  esoBookId: 6225,
  bookIndex: 39,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
