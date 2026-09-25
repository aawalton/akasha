import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const spiritOfTheDaedra = {
  id: "01a0d5e4-2557-7a34-8b2b-67b722c9bfa7",
  type: "page-type/temper-lore-book",
  slug: "spirit-of-the-daedra",
  title: "Spirit of the Daedra",
  collection: "temper-lore-collection/oblivion-lore",
  bookIndex: 6,
  shalidorPins: "jsonl",
} as const satisfies TemperLoreBook
