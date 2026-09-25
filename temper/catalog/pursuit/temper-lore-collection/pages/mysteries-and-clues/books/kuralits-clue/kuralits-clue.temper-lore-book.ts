import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const kuralitsClue = {
  id: "01a0d5f4-07b8-7312-99a4-38a105f3158f",
  type: "page-type/temper-lore-book",
  slug: "kuralits-clue",
  title: "Kuralit's Clue",
  collection: "temper-lore-collection/mysteries-and-clues",
  esoBookId: 2331,
  bookIndex: 66,
  charted: true,
  quest: 4791,
  positions: "jsonl",
} as const satisfies TemperLoreBook
