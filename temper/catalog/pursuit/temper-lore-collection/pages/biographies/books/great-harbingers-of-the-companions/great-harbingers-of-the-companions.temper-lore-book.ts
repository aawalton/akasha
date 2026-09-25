import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const greatHarbingersOfTheCompanions = {
  id: "01a0d5e3-7fd0-78e2-99c3-4a6fba60bd9c",
  type: "page-type/temper-lore-book",
  slug: "great-harbingers-of-the-companions",
  title: "Great Harbingers of the Companions",
  collection: "temper-lore-collection/biographies",
  bookIndex: 2,
  shalidorPins: "jsonl",
} as const satisfies TemperLoreBook
