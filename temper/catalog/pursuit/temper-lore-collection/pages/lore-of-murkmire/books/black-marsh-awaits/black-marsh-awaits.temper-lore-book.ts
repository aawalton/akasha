import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const blackMarshAwaits = {
  id: "01a0d5f6-a298-7656-850e-08caef21c284",
  type: "page-type/temper-lore-book",
  slug: "black-marsh-awaits",
  title: "Black Marsh Awaits!",
  collection: "temper-lore-collection/lore-of-murkmire",
  esoBookId: 5300,
  bookIndex: 53,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
