import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const claudinasNotes = {
  id: "01a0d60b-a361-7c20-b789-908c3006bf37",
  type: "page-type/temper-lore-book",
  slug: "claudinas-notes",
  title: "Claudina's Notes",
  collection: "temper-lore-collection/western-skyrim-register",
  esoBookId: 6076,
  bookIndex: 20,
  charted: true,
  quest: 6471,
  positions: "jsonl",
} as const satisfies TemperLoreBook
