import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theHiddenKey = {
  id: "01a0d5f4-07b9-7187-a970-daf6904932aa",
  type: "page-type/temper-lore-book",
  slug: "the-hidden-key",
  title: "The Hidden Key",
  collection: "temper-lore-collection/mysteries-and-clues",
  esoBookId: 1850,
  bookIndex: 42,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
