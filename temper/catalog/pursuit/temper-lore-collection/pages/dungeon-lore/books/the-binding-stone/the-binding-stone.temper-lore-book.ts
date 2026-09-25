import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theBindingStone = {
  id: "01a0d5e3-aaa1-7cfe-84b1-573885e31353",
  type: "page-type/temper-lore-book",
  slug: "the-binding-stone",
  title: "The Binding Stone",
  collection: "temper-lore-collection/dungeon-lore",
  bookIndex: 7,
  shalidorPins: "jsonl",
} as const satisfies TemperLoreBook
