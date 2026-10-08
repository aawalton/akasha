import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const lauronsJournal = {
  id: "01a0d5f5-1385-720e-aff4-1daf779395d1",
  type: "page-type/temper-lore-book",
  slug: "laurons-journal",
  title: "Lauron's Journal",
  collection: "temper-lore-collection/research-notes",
  esoBookId: 1529,
  bookIndex: 59,
  charted: true,
  positions: "jsonl",
  createdAt: "2026-09-25T00:26:43.461Z",
  updatedAt: "2026-09-25T00:26:45.000Z",
} as const satisfies TemperLoreBook
