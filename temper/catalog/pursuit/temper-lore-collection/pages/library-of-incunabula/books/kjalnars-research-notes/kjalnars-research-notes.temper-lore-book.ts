import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const kjalnarsResearchNotes = {
  id: "01a0d5f8-02f8-73f9-b4c4-086ff88926c0",
  type: "page-type/temper-lore-book",
  slug: "kjalnars-research-notes",
  title: "Kjalnar's Research Notes",
  collection: "temper-lore-collection/library-of-incunabula",
  esoBookId: 5691,
  bookIndex: 72,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
