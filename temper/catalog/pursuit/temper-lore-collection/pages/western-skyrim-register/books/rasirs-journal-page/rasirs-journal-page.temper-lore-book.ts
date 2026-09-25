import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const rasirsJournalPage = {
  id: "01a0d60b-a362-7c44-9ce7-4343465788a7",
  type: "page-type/temper-lore-book",
  slug: "rasirs-journal-page",
  title: "Rasir's Journal Page",
  collection: "temper-lore-collection/western-skyrim-register",
  esoBookId: 5936,
  bookIndex: 5,
  charted: true,
  quest: 6461,
  positions: "jsonl",
} as const satisfies TemperLoreBook
