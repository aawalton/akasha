import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const falkfyrsNotesPage1 = {
  id: "01a0d60b-c957-7d95-bee1-8ff6e60c04bf",
  type: "page-type/temper-lore-book",
  slug: "falkfyrs-notes-page-1",
  title: "Falkfyr's Notes, Page 1",
  collection: "temper-lore-collection/the-reach-reader",
  esoBookId: 6316,
  bookIndex: 12,
  charted: true,
  quest: 6591,
  positions: "jsonl",
} as const satisfies TemperLoreBook
