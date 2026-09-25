import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const developmentOfTheHollow = {
  id: "01a0d5f6-a299-79c2-b858-92ce9abc742e",
  type: "page-type/temper-lore-book",
  slug: "development-of-the-hollow",
  title: "Development of the Hollow",
  collection: "temper-lore-collection/lore-of-murkmire",
  esoBookId: 5275,
  bookIndex: 70,
  charted: true,
  quest: 6258,
  positions: "jsonl",
} as const satisfies TemperLoreBook
