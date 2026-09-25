import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const myKwamaJournalPage1 = {
  id: "01a0d5f4-6f1b-7a3c-a8e8-970e7313f475",
  type: "page-type/temper-lore-book",
  slug: "my-kwama-journal-page-1",
  title: "My Kwama Journal, Page 1",
  collection: "temper-lore-collection/personal-journals",
  esoBookId: 1022,
  bookIndex: 41,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
