import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const allAboutGiants = {
  id: "01a0d5e4-88db-7b72-b232-0a093976b1eb",
  type: "page-type/temper-lore-book",
  slug: "all-about-giants",
  title: "All About Giants",
  collection: "temper-lore-collection/eastmarch-lore",
  bookIndex: 7,
  shalidorPins: "jsonl",
} as const satisfies TemperLoreBook
