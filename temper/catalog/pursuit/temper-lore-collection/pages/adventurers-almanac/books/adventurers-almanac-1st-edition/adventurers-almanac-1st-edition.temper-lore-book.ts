import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const adventurersAlmanac1stEdition = {
  id: "01a0d5f8-1fb2-7afb-89bf-615c7b698517",
  type: "page-type/temper-lore-book",
  slug: "adventurers-almanac-1st-edition",
  title: "Adventurer's Almanac, 1st Edition",
  collection: "temper-lore-collection/adventurers-almanac",
  esoBookId: 4116,
  bookIndex: 1,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
