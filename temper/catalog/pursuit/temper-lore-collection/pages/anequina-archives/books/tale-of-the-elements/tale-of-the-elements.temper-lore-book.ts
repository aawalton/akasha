import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const taleOfTheElements = {
  id: "01a0d60b-2345-7e09-b3ff-7cdda3e6fdf1",
  type: "page-type/temper-lore-book",
  slug: "tale-of-the-elements",
  title: "Tale of the Elements",
  collection: "temper-lore-collection/anequina-archives",
  esoBookId: 5395,
  bookIndex: 82,
  charted: true,
  quest: 6307,
  positions: "jsonl",
} as const satisfies TemperLoreBook
