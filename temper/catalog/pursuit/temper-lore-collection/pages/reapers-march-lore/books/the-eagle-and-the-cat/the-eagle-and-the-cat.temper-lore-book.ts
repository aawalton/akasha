import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theEagleAndTheCat = {
  id: "01a0d5e5-0039-7142-be30-10bec50cc12d",
  type: "page-type/temper-lore-book",
  slug: "the-eagle-and-the-cat",
  title: "The Eagle and the Cat",
  collection: "temper-lore-collection/reapers-march-lore",
  bookIndex: 5,
  shalidorPins: "jsonl",
} as const satisfies TemperLoreBook
