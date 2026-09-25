import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const lostAndDustyJournal = {
  id: "01a0d5f6-45ae-7cf6-a8b0-f86fc1656087",
  type: "page-type/temper-lore-book",
  slug: "lost-and-dusty-journal",
  title: "Lost and Dusty Journal",
  collection: "temper-lore-collection/final-words",
  esoBookId: 1587,
  bookIndex: 39,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
