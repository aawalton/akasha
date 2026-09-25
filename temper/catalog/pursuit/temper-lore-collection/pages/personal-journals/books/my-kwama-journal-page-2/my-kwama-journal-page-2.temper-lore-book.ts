import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const myKwamaJournalPage2 = {
  id: "01a0d5f4-6f1b-7e6f-a973-a17f79392ce5",
  type: "page-type/temper-lore-book",
  slug: "my-kwama-journal-page-2",
  title: "My Kwama Journal, Page 2",
  collection: "temper-lore-collection/personal-journals",
  esoBookId: 1023,
  bookIndex: 42,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
