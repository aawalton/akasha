import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theBlessingsOfJoneAndJode = {
  id: "01a0d60b-2346-76b3-8b58-0052eeafd2c0",
  type: "page-type/temper-lore-book",
  slug: "the-blessings-of-jone-and-jode",
  title: "The Blessings of Jone and Jode",
  collection: "temper-lore-collection/anequina-archives",
  esoBookId: 5453,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
