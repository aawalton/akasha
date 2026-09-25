import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const forbiddenResearchNotes = {
  id: "01a0d5f5-1384-7a9b-83c0-727e271d8650",
  type: "page-type/temper-lore-book",
  slug: "forbidden-research-notes",
  title: "Forbidden Research Notes",
  collection: "temper-lore-collection/research-notes",
  esoBookId: 933,
  bookIndex: 33,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
