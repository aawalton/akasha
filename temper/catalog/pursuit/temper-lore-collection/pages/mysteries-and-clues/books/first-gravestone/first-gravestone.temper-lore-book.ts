import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const firstGravestone = {
  id: "01a0d5f4-07b7-778b-bd69-7b2867436c82",
  type: "page-type/temper-lore-book",
  slug: "first-gravestone",
  title: "First Gravestone",
  collection: "temper-lore-collection/mysteries-and-clues",
  esoBookId: 2057,
  bookIndex: 50,
  charted: true,
  quest: 4980,
  positions: "jsonl",
} as const satisfies TemperLoreBook
