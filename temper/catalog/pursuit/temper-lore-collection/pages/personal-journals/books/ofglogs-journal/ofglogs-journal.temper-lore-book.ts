import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const ofglogsJournal = {
  id: "01a0d5f4-6f1b-70f7-8b68-4bec94d56b2d",
  type: "page-type/temper-lore-book",
  slug: "ofglogs-journal",
  title: "Ofglog's Journal",
  collection: "temper-lore-collection/personal-journals",
  esoBookId: 1321,
  bookIndex: 57,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
