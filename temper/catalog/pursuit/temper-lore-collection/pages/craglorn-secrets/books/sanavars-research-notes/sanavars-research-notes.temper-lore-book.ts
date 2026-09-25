import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const sanavarsResearchNotes = {
  id: "01a0d5f1-c91b-7f41-b5fd-d02b3fa685eb",
  type: "page-type/temper-lore-book",
  slug: "sanavars-research-notes",
  title: "Sanavar's Research Notes",
  collection: "temper-lore-collection/craglorn-secrets",
  esoBookId: 2429,
  bookIndex: 8,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
