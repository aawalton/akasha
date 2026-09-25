import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const ofMenAndMer = {
  id: "01a0d5f6-1c16-70f9-a546-fb27d9ecddb4",
  type: "page-type/temper-lore-book",
  slug: "of-men-and-mer",
  title: "Of Men and Mer",
  collection: "temper-lore-collection/words-of-the-poets",
  esoBookId: 1263,
  bookIndex: 42,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
