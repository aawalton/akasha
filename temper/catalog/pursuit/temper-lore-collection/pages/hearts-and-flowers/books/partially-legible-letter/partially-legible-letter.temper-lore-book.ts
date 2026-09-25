import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const partiallyLegibleLetter = {
  id: "01a0d5f2-af70-710a-8211-c88921e83ab4",
  type: "page-type/temper-lore-book",
  slug: "partially-legible-letter",
  title: "Partially Legible Letter",
  collection: "temper-lore-collection/hearts-and-flowers",
  esoBookId: 1331,
  bookIndex: 40,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
