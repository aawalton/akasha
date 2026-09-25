import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const closingPerformanceNotes = {
  id: "01a0d5f4-3c11-797a-9e3c-0a35be6d4d5a",
  type: "page-type/temper-lore-book",
  slug: "closing-performance-notes",
  title: "Closing Performance Notes",
  collection: "temper-lore-collection/notes-and-memos",
  esoBookId: 2624,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
