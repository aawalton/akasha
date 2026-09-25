import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const thirdGravestone = {
  id: "01a0d5f4-07b9-7495-b2a5-afe304973cc6",
  type: "page-type/temper-lore-book",
  slug: "third-gravestone",
  title: "Third Gravestone",
  collection: "temper-lore-collection/mysteries-and-clues",
  esoBookId: 2059,
  bookIndex: 52,
  charted: true,
  quest: 4980,
  positions: "jsonl",
} as const satisfies TemperLoreBook
