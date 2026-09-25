import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theBearersOfFargrave = {
  id: "01a0d60c-40c0-78fc-a3a6-78c2d6676075",
  type: "page-type/temper-lore-book",
  slug: "the-bearers-of-fargrave",
  title: "The Bearers of Fargrave",
  collection: "temper-lore-collection/dispatches-from-the-deadlands",
  esoBookId: 7048,
  bookIndex: 79,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
