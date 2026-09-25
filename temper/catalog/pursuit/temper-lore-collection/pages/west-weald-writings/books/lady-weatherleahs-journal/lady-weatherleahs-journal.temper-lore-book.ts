import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const ladyWeatherleahsJournal = {
  id: "01a0d60d-4aaf-78df-b2b8-23dd4bb43985",
  type: "page-type/temper-lore-book",
  slug: "lady-weatherleahs-journal",
  title: "Lady Weatherleah's Journal",
  collection: "temper-lore-collection/west-weald-writings",
  esoBookId: 8044,
  bookIndex: 80,
  charted: true,
  quest: 7082,
  positions: "jsonl",
} as const satisfies TemperLoreBook
