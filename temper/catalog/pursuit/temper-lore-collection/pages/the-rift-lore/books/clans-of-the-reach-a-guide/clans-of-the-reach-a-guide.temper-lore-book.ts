import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const clansOfTheReachAGuide = {
  id: "01a0d5e4-b08a-7438-b1d5-2422e0a53757",
  type: "page-type/temper-lore-book",
  slug: "clans-of-the-reach-a-guide",
  title: "Clans of the Reach: A Guide",
  collection: "temper-lore-collection/the-rift-lore",
  bookIndex: 10,
  shalidorPins: "jsonl",
} as const satisfies TemperLoreBook
