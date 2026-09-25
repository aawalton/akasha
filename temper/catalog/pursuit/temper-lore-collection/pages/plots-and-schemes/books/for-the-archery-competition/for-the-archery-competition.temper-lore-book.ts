import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const forTheArcheryCompetition = {
  id: "01a0d5f4-c383-7347-a376-91c75e6895d2",
  type: "page-type/temper-lore-book",
  slug: "for-the-archery-competition",
  title: "For the Archery Competition",
  collection: "temper-lore-collection/plots-and-schemes",
  esoBookId: 1241,
  bookIndex: 40,
  charted: true,
  quest: 4058,
  positions: "jsonl",
} as const satisfies TemperLoreBook
