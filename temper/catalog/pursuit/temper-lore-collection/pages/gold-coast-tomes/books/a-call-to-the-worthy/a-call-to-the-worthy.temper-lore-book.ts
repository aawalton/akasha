import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aCallToTheWorthy = {
  id: "01a0d5f7-73f9-71c5-88cc-632e11b4160a",
  type: "page-type/temper-lore-book",
  slug: "a-call-to-the-worthy",
  title: "A Call to the Worthy",
  collection: "temper-lore-collection/gold-coast-tomes",
  esoBookId: 3641,
  bookIndex: 40,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
