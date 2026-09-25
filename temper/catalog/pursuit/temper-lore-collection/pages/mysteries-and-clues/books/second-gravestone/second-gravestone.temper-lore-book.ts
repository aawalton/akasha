import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const secondGravestone = {
  id: "01a0d5f4-07b9-7f92-93a9-606b1453e179",
  type: "page-type/temper-lore-book",
  slug: "second-gravestone",
  title: "Second Gravestone",
  collection: "temper-lore-collection/mysteries-and-clues",
  esoBookId: 2058,
  bookIndex: 51,
  charted: true,
  quest: 4980,
  positions: "jsonl",
} as const satisfies TemperLoreBook
