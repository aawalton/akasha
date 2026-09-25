import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const scrappersJournal = {
  id: "01a0d60b-a362-71c8-b028-3e74efe2e8a4",
  type: "page-type/temper-lore-book",
  slug: "scrappers-journal",
  title: "Scrapper's Journal",
  collection: "temper-lore-collection/western-skyrim-register",
  esoBookId: 6039,
  bookIndex: 12,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
