import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const goneFromSaintedMemory = {
  id: "01a0d60b-2345-751c-9b74-9e1c97205934",
  type: "page-type/temper-lore-book",
  slug: "gone-from-sainted-memory",
  title: "Gone from Sainted Memory",
  collection: "temper-lore-collection/anequina-archives",
  esoBookId: 5487,
  bookIndex: 29,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
