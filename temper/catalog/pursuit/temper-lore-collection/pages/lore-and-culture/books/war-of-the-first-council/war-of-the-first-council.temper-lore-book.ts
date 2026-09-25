import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const warOfTheFirstCouncil = {
  id: "01a0d5f3-3fdc-74dc-92db-241afa8f5b5d",
  type: "page-type/temper-lore-book",
  slug: "war-of-the-first-council",
  title: "War of the First Council",
  collection: "temper-lore-collection/lore-and-culture",
  esoBookId: 624,
  bookIndex: 11,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
