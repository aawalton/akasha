import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const foodOfTheDeadlands = {
  id: "01a0d60c-40c0-7e09-b336-1a0bb119dc69",
  type: "page-type/temper-lore-book",
  slug: "food-of-the-deadlands",
  title: "Food of the Deadlands",
  collection: "temper-lore-collection/dispatches-from-the-deadlands",
  esoBookId: 6918,
  bookIndex: 46,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
