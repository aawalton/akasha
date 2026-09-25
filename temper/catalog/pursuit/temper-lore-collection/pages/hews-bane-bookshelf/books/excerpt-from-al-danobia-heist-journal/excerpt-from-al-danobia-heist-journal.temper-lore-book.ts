import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const excerptFromAlDanobiaHeistJournal = {
  id: "01a0d5f7-4293-770c-9b18-65d60ec6b4fd",
  type: "page-type/temper-lore-book",
  slug: "excerpt-from-al-danobia-heist-journal",
  title: "Excerpt from al-Danobia Heist Journal",
  collection: "temper-lore-collection/hews-bane-bookshelf",
  esoBookId: 3283,
  bookIndex: 48,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
