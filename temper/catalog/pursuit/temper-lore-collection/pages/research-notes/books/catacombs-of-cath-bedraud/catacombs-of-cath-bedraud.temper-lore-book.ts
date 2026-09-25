import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const catacombsOfCathBedraud = {
  id: "01a0d5f5-1384-77e9-9ec9-aaada6c725d1",
  type: "page-type/temper-lore-book",
  slug: "catacombs-of-cath-bedraud",
  title: "Catacombs of Cath Bedraud",
  collection: "temper-lore-collection/research-notes",
  esoBookId: 1270,
  bookIndex: 50,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
