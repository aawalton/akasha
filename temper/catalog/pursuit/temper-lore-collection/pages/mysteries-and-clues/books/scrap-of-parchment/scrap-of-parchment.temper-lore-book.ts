import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const scrapOfParchment = {
  id: "01a0d5f4-07b8-7f7f-939d-d4dc7b1db21b",
  type: "page-type/temper-lore-book",
  slug: "scrap-of-parchment",
  title: "Scrap of Parchment",
  collection: "temper-lore-collection/mysteries-and-clues",
  bookIndex: 21,
} as const satisfies TemperLoreBook
