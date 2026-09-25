import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const increasedBanditActivity = {
  id: "01a0d5f4-3c12-7e11-adbc-f81ed23c0c54",
  type: "page-type/temper-lore-book",
  slug: "increased-bandit-activity",
  title: "Increased Bandit Activity",
  collection: "temper-lore-collection/notes-and-memos",
  esoBookId: 1577,
  bookIndex: 46,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
