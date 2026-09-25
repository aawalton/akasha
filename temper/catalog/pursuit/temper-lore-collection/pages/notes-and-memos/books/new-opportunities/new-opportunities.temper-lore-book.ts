import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const newOpportunities = {
  id: "01a0d5f4-3c12-79a8-83d7-fb895c2016f9",
  type: "page-type/temper-lore-book",
  slug: "new-opportunities",
  title: "New Opportunities",
  collection: "temper-lore-collection/notes-and-memos",
  esoBookId: 1541,
  bookIndex: 39,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
