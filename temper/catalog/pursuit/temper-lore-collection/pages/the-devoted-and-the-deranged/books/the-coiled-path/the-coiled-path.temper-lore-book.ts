import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theCoiledPath = {
  id: "01a0d5f5-abba-7188-99a3-928c977413d4",
  type: "page-type/temper-lore-book",
  slug: "the-coiled-path",
  title: "The Coiled Path",
  collection: "temper-lore-collection/the-devoted-and-the-deranged",
  esoBookId: 644,
  bookIndex: 18,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
