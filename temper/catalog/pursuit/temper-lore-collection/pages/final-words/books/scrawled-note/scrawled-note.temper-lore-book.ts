import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const scrawledNote = {
  id: "01a0d5f6-45ae-706a-80f5-bf465739befb",
  type: "page-type/temper-lore-book",
  slug: "scrawled-note",
  title: "Scrawled Note",
  collection: "temper-lore-collection/final-words",
  esoBookId: 141,
  bookIndex: 3,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
