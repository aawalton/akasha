import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const euraxiasPersonalJournal = {
  id: "01a0d60b-2344-7482-9173-eda9c1e476c8",
  type: "page-type/temper-lore-book",
  slug: "euraxias-personal-journal",
  title: "Euraxia's Personal Journal",
  collection: "temper-lore-collection/anequina-archives",
  esoBookId: 5471,
  bookIndex: 22,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
