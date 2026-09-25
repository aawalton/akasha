import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const versesOfTheIlluminated = {
  id: "01a0d5f6-1c16-72f0-8157-556491253800",
  type: "page-type/temper-lore-book",
  slug: "verses-of-the-illuminated",
  title: "Verses of the Illuminated",
  collection: "temper-lore-collection/words-of-the-poets",
  esoBookId: 1051,
  bookIndex: 37,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
