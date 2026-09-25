import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const noteFromLadyWeatherleah = {
  id: "01a0d60d-4ab0-7c9f-a1b1-b3b11cb20744",
  type: "page-type/temper-lore-book",
  slug: "note-from-lady-weatherleah",
  title: "Note from Lady Weatherleah",
  collection: "temper-lore-collection/west-weald-writings",
  esoBookId: 7842,
  bookIndex: 71,
  charted: true,
  quest: 7082,
  positions: "jsonl",
} as const satisfies TemperLoreBook
