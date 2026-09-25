import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const tishisResearchNotes = {
  id: "01a0d5f1-c91b-7bb3-aac6-d6df2f8a5725",
  type: "page-type/temper-lore-book",
  slug: "tishis-research-notes",
  title: "Tishi's Research Notes",
  collection: "temper-lore-collection/craglorn-secrets",
  esoBookId: 2566,
  bookIndex: 16,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
