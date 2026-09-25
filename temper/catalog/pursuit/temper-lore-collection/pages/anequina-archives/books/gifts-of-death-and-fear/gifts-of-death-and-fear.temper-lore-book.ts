import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const giftsOfDeathAndFear = {
  id: "01a0d60b-2345-7c49-9fb1-54f4bacceb48",
  type: "page-type/temper-lore-book",
  slug: "gifts-of-death-and-fear",
  title: "Gifts of Death and Fear",
  collection: "temper-lore-collection/anequina-archives",
  esoBookId: 5483,
  bookIndex: 32,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
