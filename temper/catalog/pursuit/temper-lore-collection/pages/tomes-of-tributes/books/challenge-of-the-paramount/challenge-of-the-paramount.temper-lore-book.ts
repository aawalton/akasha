import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const challengeOfTheParamount = {
  id: "01a0d60c-9395-7dd1-a3b3-ff93754c7052",
  type: "page-type/temper-lore-book",
  slug: "challenge-of-the-paramount",
  title: "Challenge of the Paramount",
  collection: "temper-lore-collection/tomes-of-tributes",
  esoBookId: 7713,
  bookIndex: 22,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
