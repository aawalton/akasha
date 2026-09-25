import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const robhirsLetter = {
  id: "01a0d60c-40c0-71a5-b810-912b3cc7aaa7",
  type: "page-type/temper-lore-book",
  slug: "robhirs-letter",
  title: "Robhir's Letter",
  collection: "temper-lore-collection/dispatches-from-the-deadlands",
  esoBookId: 6844,
  bookIndex: 27,
  charted: true,
  quest: 6731,
  positions: "jsonl",
} as const satisfies TemperLoreBook
