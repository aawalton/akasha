import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const heetzasisJournalPage1 = {
  id: "01a0d5f6-a299-791a-8f88-49a53a401c53",
  type: "page-type/temper-lore-book",
  slug: "heetzasis-journal-page-1",
  title: "Heetzasi's Journal, Page 1",
  collection: "temper-lore-collection/lore-of-murkmire",
  esoBookId: 5291,
  bookIndex: 78,
  charted: true,
  quest: 6241,
  positions: "jsonl",
} as const satisfies TemperLoreBook
