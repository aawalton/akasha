import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const oneDragonTwoDragon = {
  id: "01a0d60b-2345-7f53-9da7-72b29fce52dc",
  type: "page-type/temper-lore-book",
  slug: "one-dragon-two-dragon",
  title: "One Dragon Two Dragon",
  collection: "temper-lore-collection/anequina-archives",
  esoBookId: 5612,
  bookIndex: 68,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
