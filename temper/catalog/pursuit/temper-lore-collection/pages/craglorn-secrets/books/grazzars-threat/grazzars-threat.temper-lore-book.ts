import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const grazzarsThreat = {
  id: "01a0d5f1-c91a-711b-af10-4dc667d1e727",
  type: "page-type/temper-lore-book",
  slug: "grazzars-threat",
  title: "Grazzar's Threat",
  collection: "temper-lore-collection/craglorn-secrets",
  esoBookId: 2611,
  bookIndex: 39,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
