import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const sigilOfTheNetchAnalysis = {
  id: "01a0d60d-9a64-7f25-ac29-72e7600100db",
  type: "page-type/temper-lore-book",
  slug: "sigil-of-the-netch-analysis",
  title: "Sigil of the Netch Analysis",
  collection: "temper-lore-collection/scholarium-scribblings",
  esoBookId: 8210,
  bookIndex: 38,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
