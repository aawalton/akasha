import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToLadyWeatherleah = {
  id: "01a0d60d-4aaf-7e38-bb09-4560df599557",
  type: "page-type/temper-lore-book",
  slug: "letter-to-lady-weatherleah",
  title: "Letter to Lady Weatherleah",
  collection: "temper-lore-collection/west-weald-writings",
  esoBookId: 7868,
  bookIndex: 79,
  charted: true,
  quest: 7082,
  positions: "jsonl",
} as const satisfies TemperLoreBook
