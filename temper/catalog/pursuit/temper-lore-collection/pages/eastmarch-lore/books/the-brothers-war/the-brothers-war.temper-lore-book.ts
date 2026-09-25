import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theBrothersWar = {
  id: "01a0d5e4-88dc-79bc-a43c-5791e6c905df",
  type: "page-type/temper-lore-book",
  slug: "the-brothers-war",
  title: "The Brothers' War",
  collection: "temper-lore-collection/eastmarch-lore",
  bookIndex: 1,
  shalidorPins: "jsonl",
} as const satisfies TemperLoreBook
