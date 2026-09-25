import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const anonymousTornJournal = {
  id: "01a0d60b-2344-7f83-9a81-29841e46a506",
  type: "page-type/temper-lore-book",
  slug: "anonymous-torn-journal",
  title: "Anonymous Torn Journal",
  collection: "temper-lore-collection/anequina-archives",
  esoBookId: 5616,
  bookIndex: 72,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
