import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const dreadsailsCommunique = {
  id: "01a0d60c-75b5-7e09-9661-17f1368dc077",
  type: "page-type/temper-lore-book",
  slug: "dreadsails-communique",
  title: "Dreadsails Communique",
  collection: "temper-lore-collection/systres-tomes-and-scrolls",
  esoBookId: 7027,
  charted: true,
  quest: 6773,
  positions: "jsonl",
} as const satisfies TemperLoreBook
