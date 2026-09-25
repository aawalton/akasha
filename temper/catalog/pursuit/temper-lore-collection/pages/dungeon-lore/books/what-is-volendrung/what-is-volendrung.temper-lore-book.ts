import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const whatIsVolendrung = {
  id: "01a0d5e3-aaa1-7e65-8080-6438a493ecca",
  type: "page-type/temper-lore-book",
  slug: "what-is-volendrung",
  title: "What is Volendrung?",
  collection: "temper-lore-collection/dungeon-lore",
  bookIndex: 2,
  shalidorPins: "jsonl",
} as const satisfies TemperLoreBook
