import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theArtOfKwamaEggCooking = {
  id: "01a0d5e3-aaa1-7a80-97a8-e246789e55ef",
  type: "page-type/temper-lore-book",
  slug: "the-art-of-kwama-egg-cooking",
  title: "The Art of Kwama Egg Cooking",
  collection: "temper-lore-collection/dungeon-lore",
  bookIndex: 6,
  shalidorPins: "jsonl",
} as const satisfies TemperLoreBook
