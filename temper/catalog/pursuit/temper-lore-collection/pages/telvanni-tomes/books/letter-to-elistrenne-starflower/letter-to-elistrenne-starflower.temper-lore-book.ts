import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToElistrenneStarflower = {
  id: "01a0d60c-eb9b-77cb-824b-15b8a907ba83",
  type: "page-type/temper-lore-book",
  slug: "letter-to-elistrenne-starflower",
  title: "Letter to Elistrenne Starflower",
  collection: "temper-lore-collection/telvanni-tomes",
  esoBookId: 7677,
  bookIndex: 81,
  charted: true,
  quest: 7020,
  positions: "jsonl",
} as const satisfies TemperLoreBook
