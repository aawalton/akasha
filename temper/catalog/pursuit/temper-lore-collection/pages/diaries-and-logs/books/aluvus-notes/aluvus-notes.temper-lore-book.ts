import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aluvusNotes = {
  id: "01a0d5f2-509e-740e-8815-24585574f932",
  type: "page-type/temper-lore-book",
  slug: "aluvus-notes",
  title: "Aluvus' Notes",
  collection: "temper-lore-collection/diaries-and-logs",
  esoBookId: 702,
  bookIndex: 8,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
