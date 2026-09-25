import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const wordsOfTheWind = {
  id: "01a0d5e4-38b2-7b28-a24f-20d4426b6772",
  type: "page-type/temper-lore-book",
  slug: "words-of-the-wind",
  title: "Words of the Wind",
  collection: "temper-lore-collection/poetry-and-song",
  bookIndex: 10,
  shalidorPins: "jsonl",
} as const satisfies TemperLoreBook
