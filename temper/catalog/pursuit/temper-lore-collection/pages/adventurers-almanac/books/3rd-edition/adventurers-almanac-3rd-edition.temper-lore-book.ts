import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const adventurersAlmanac3rdEdition = {
  id: "01a0d5f8-1fb3-7885-be2b-7f507947f379",
  type: "page-type/temper-lore-book",
  slug: "adventurers-almanac-3rd-edition",
  title: "Adventurer's Almanac, 3rd Edition",
  collection: "temper-lore-collection/adventurers-almanac",
  esoBookId: 5625,
  bookIndex: 3,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
