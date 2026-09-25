import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const kynmarcherStrixsJournal = {
  id: "01a0d60d-156e-779f-8ed7-4168bc884079",
  type: "page-type/temper-lore-book",
  slug: "kynmarcher-strixs-journal",
  title: "Kynmarcher Strix's Journal",
  collection: "temper-lore-collection/apocryphal-pages",
  esoBookId: 7434,
  bookIndex: 17,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
