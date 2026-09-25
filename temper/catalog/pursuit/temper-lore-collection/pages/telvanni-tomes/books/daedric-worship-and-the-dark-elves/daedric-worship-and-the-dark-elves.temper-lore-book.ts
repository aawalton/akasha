import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const daedricWorshipAndTheDarkElves = {
  id: "01a0d60c-eb9b-7855-8f41-8eb786b42d7e",
  type: "page-type/temper-lore-book",
  slug: "daedric-worship-and-the-dark-elves",
  title: "Daedric Worship and the Dark Elves",
  collection: "temper-lore-collection/telvanni-tomes",
  esoBookId: 7452,
  bookIndex: 45,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
