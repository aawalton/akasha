import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const ushenatsNotes = {
  id: "01a0d5f6-d68c-75c2-bdf4-014e99602707",
  type: "page-type/temper-lore-book",
  slug: "ushenats-notes",
  title: "Ushenat's Notes",
  collection: "temper-lore-collection/wrothgar-writings",
  esoBookId: 3140,
  bookIndex: 92,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
