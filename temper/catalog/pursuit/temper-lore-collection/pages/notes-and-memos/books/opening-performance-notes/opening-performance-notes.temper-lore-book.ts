import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const openingPerformanceNotes = {
  id: "01a0d5f4-3c12-79ff-ad6d-6481138c8f79",
  type: "page-type/temper-lore-book",
  slug: "opening-performance-notes",
  title: "Opening Performance Notes",
  collection: "temper-lore-collection/notes-and-memos",
  esoBookId: 2622,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
