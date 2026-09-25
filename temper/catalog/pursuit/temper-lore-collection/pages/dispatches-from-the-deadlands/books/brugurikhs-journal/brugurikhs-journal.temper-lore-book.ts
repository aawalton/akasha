import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const brugurikhsJournal = {
  id: "01a0d60c-40bf-7538-b5ed-f609a1c49349",
  type: "page-type/temper-lore-book",
  slug: "brugurikhs-journal",
  title: "Brugurikh's Journal",
  collection: "temper-lore-collection/dispatches-from-the-deadlands",
  esoBookId: 6930,
  bookIndex: 53,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
