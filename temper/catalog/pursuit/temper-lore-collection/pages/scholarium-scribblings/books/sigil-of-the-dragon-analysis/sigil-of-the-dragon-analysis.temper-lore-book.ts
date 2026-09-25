import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const sigilOfTheDragonAnalysis = {
  id: "01a0d60d-9a64-714c-9b06-fd3780b0a7e4",
  type: "page-type/temper-lore-book",
  slug: "sigil-of-the-dragon-analysis",
  title: "Sigil of the Dragon Analysis",
  collection: "temper-lore-collection/scholarium-scribblings",
  esoBookId: 8212,
  bookIndex: 40,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
