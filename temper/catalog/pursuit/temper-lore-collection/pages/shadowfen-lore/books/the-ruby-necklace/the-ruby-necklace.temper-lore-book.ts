import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theRubyNecklace = {
  id: "01a0d5e3-4278-7924-a873-1a3438887d50",
  type: "page-type/temper-lore-book",
  slug: "the-ruby-necklace",
  title: "The Ruby Necklace",
  collection: "temper-lore-collection/shadowfen-lore",
  bookIndex: 9,
  shalidorPins: "jsonl",
} as const satisfies TemperLoreBook
