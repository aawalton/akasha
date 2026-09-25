import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theDayOfRemembering = {
  id: "01a0d60d-4ab0-788b-afb0-fd625ad0c992",
  type: "page-type/temper-lore-book",
  slug: "the-day-of-remembering",
  title: "The Day of Remembering",
  collection: "temper-lore-collection/west-weald-writings",
  esoBookId: 7853,
  bookIndex: 47,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
