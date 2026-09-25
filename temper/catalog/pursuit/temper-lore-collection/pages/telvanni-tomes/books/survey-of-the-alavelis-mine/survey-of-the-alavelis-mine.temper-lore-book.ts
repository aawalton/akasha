import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const surveyOfTheAlavelisMine = {
  id: "01a0d60c-eb9c-7870-95ce-bb3c617e633c",
  type: "page-type/temper-lore-book",
  slug: "survey-of-the-alavelis-mine",
  title: "Survey of the Alavelis Mine",
  collection: "temper-lore-collection/telvanni-tomes",
  esoBookId: 7694,
  bookIndex: 18,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
