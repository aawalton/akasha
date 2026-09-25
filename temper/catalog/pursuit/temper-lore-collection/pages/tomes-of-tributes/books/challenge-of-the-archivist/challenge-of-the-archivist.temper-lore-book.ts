import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const challengeOfTheArchivist = {
  id: "01a0d60c-9395-7418-aa50-7ef12d10aae9",
  type: "page-type/temper-lore-book",
  slug: "challenge-of-the-archivist",
  title: "Challenge of the Archivist",
  collection: "temper-lore-collection/tomes-of-tributes",
  esoBookId: 7941,
  bookIndex: 25,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
