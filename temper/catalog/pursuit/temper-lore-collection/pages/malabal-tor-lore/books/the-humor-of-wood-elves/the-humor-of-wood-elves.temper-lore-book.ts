import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theHumorOfWoodElves = {
  id: "01a0d5e4-74e1-7b85-9432-33580fd80261",
  type: "page-type/temper-lore-book",
  slug: "the-humor-of-wood-elves",
  title: "The Humor of Wood Elves",
  collection: "temper-lore-collection/malabal-tor-lore",
  bookIndex: 5,
  shalidorPins: "jsonl",
} as const satisfies TemperLoreBook
