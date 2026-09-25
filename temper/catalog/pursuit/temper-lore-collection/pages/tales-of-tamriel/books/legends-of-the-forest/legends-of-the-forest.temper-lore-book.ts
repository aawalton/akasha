import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const legendsOfTheForest = {
  id: "01a0d5f5-7767-78e5-a898-9c5873eb654f",
  type: "page-type/temper-lore-book",
  slug: "legends-of-the-forest",
  title: "Legends of the Forest",
  collection: "temper-lore-collection/tales-of-tamriel",
  esoBookId: 389,
  bookIndex: 4,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
