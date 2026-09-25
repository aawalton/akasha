import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const workForHireInFargrave = {
  id: "01a0d60c-40c1-72d4-9c60-f0e03fee8f48",
  type: "page-type/temper-lore-book",
  slug: "work-for-hire-in-fargrave",
  title: "Work for Hire in Fargrave",
  collection: "temper-lore-collection/dispatches-from-the-deadlands",
  esoBookId: 6775,
  bookIndex: 1,
  charted: true,
  quest: 6709,
  positions: "jsonl",
} as const satisfies TemperLoreBook
