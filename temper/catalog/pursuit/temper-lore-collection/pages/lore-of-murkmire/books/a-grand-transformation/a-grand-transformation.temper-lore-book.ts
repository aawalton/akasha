import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aGrandTransformation = {
  id: "01a0d5f6-a298-748b-8343-d10d9d96214e",
  type: "page-type/temper-lore-book",
  slug: "a-grand-transformation",
  title: "A Grand Transformation",
  collection: "temper-lore-collection/lore-of-murkmire",
  esoBookId: 5373,
  bookIndex: 90,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
