import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const anExilesNotes = {
  id: "01a0d5f4-6f19-721d-b2db-b2d31118507f",
  type: "page-type/temper-lore-book",
  slug: "an-exiles-notes",
  title: "An Exile's Notes",
  collection: "temper-lore-collection/personal-journals",
  esoBookId: 2825,
  bookIndex: 96,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
