import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const sacredPlaces = {
  id: "01a0d5f5-abba-711a-bcff-5d970004ecdb",
  type: "page-type/temper-lore-book",
  slug: "sacred-places",
  title: "Sacred Places",
  collection: "temper-lore-collection/the-devoted-and-the-deranged",
  esoBookId: 848,
  bookIndex: 31,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
