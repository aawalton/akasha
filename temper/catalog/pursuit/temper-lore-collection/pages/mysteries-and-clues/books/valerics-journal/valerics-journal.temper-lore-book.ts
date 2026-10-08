import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const valericsJournal = {
  id: "01a0d5f4-07b9-7af5-84bd-056fe8c3cd5b",
  type: "page-type/temper-lore-book",
  slug: "valerics-journal",
  title: "Valeric's Journal",
  collection: "temper-lore-collection/mysteries-and-clues",
  esoBookId: 443,
  bookIndex: 3,
  charted: true,
  positions: "jsonl",
  createdAt: "2026-09-25T00:25:34.905Z",
  updatedAt: "2026-09-25T00:25:37.000Z",
} as const satisfies TemperLoreBook
