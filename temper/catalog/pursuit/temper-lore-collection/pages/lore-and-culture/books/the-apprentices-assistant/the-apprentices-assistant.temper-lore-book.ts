import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theApprenticesAssistant = {
  id: "01a0d5f3-3fdb-78ad-b5a9-3ad2bffe4bdb",
  type: "page-type/temper-lore-book",
  slug: "the-apprentices-assistant",
  title: "The Apprentice's Assistant",
  collection: "temper-lore-collection/lore-and-culture",
  esoBookId: 652,
  bookIndex: 12,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
