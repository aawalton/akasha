import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const sigilOfTheGryphonAnalysis = {
  id: "01a0d60d-9a64-7c92-8d8c-64cfa149a9e4",
  type: "page-type/temper-lore-book",
  slug: "sigil-of-the-gryphon-analysis",
  title: "Sigil of the Gryphon Analysis",
  collection: "temper-lore-collection/scholarium-scribblings",
  esoBookId: 8211,
  bookIndex: 39,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
