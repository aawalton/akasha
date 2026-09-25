import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const increasedDominionActivity = {
  id: "01a0d5f4-3c12-7fd4-a55e-440aa5fc6575",
  type: "page-type/temper-lore-book",
  slug: "increased-dominion-activity",
  title: "Increased Dominion Activity",
  collection: "temper-lore-collection/notes-and-memos",
  esoBookId: 2117,
  bookIndex: 85,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
