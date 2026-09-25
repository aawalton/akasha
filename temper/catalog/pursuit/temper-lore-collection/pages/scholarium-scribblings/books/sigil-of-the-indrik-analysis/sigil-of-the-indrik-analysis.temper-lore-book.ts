import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const sigilOfTheIndrikAnalysis = {
  id: "01a0d60d-9a64-7d49-beb2-cc3f1078b027",
  type: "page-type/temper-lore-book",
  slug: "sigil-of-the-indrik-analysis",
  title: "Sigil of the Indrik Analysis",
  collection: "temper-lore-collection/scholarium-scribblings",
  esoBookId: 8208,
  bookIndex: 36,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
