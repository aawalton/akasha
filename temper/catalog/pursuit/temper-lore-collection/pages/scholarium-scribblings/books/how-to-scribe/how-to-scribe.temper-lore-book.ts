import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const howToScribe = {
  id: "01a0d60d-9a63-7216-a5d1-888c02420eae",
  type: "page-type/temper-lore-book",
  slug: "how-to-scribe",
  title: "How to Scribe",
  collection: "temper-lore-collection/scholarium-scribblings",
  esoBookId: 8189,
  bookIndex: 33,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
