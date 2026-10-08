import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const charredNotes = {
  id: "01a0d5f5-abb9-7f01-82a8-5d357942eaf4",
  type: "page-type/temper-lore-book",
  slug: "charred-notes",
  title: "Charred Notes",
  collection: "temper-lore-collection/the-devoted-and-the-deranged",
  esoBookId: 73,
  bookIndex: 2,
  charted: true,
  quest: 3902,
  positions: "jsonl",
  createdAt: "2026-09-25T00:27:22.425Z",
  updatedAt: "2026-09-25T00:27:24.000Z",
} as const satisfies TemperLoreBook
