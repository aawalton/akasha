import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const dirgeOfTheStormySeas = {
  id: "01a0d60c-75b5-7f44-8c60-b4b8ce679584",
  type: "page-type/temper-lore-book",
  slug: "dirge-of-the-stormy-seas",
  title: "Dirge of the Stormy Seas",
  collection: "temper-lore-collection/systres-tomes-and-scrolls",
  esoBookId: 7117,
  bookIndex: 45,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
