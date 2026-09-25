import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const challengeOfThePaladin = {
  id: "01a0d60c-9395-7e4d-9a90-32b521ca2e91",
  type: "page-type/temper-lore-book",
  slug: "challenge-of-the-paladin",
  title: "Challenge of the Paladin",
  collection: "temper-lore-collection/tomes-of-tributes",
  esoBookId: 8116,
  bookIndex: 30,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
