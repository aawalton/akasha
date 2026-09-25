import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theCrownOfFreydis = {
  id: "01a0d5e4-88dc-7481-921b-77f4c5b5cf20",
  type: "page-type/temper-lore-book",
  slug: "the-crown-of-freydis",
  title: "The Crown of Freydis",
  collection: "temper-lore-collection/eastmarch-lore",
  bookIndex: 5,
  shalidorPins: "jsonl",
} as const satisfies TemperLoreBook
