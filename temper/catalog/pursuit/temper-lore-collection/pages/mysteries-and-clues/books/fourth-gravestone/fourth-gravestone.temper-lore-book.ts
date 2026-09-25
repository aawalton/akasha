import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const fourthGravestone = {
  id: "01a0d5f4-07b7-777d-b71b-02f23f06b5e1",
  type: "page-type/temper-lore-book",
  slug: "fourth-gravestone",
  title: "Fourth Gravestone",
  collection: "temper-lore-collection/mysteries-and-clues",
  esoBookId: 2060,
  bookIndex: 53,
  charted: true,
  quest: 4980,
  positions: "jsonl",
} as const satisfies TemperLoreBook
