import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const soiledJournalPage = {
  id: "01a0d60d-ff6a-785b-8c80-2e346db7c020",
  type: "page-type/temper-lore-book",
  slug: "soiled-journal-page",
  title: "Soiled Journal Page",
  collection: "temper-lore-collection/solstice-summations",
  esoBookId: 8384,
  bookIndex: 36,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
