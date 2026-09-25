import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const songOfDespair = {
  id: "01a0d5f6-1c16-7392-b915-bf8ed56b1489",
  type: "page-type/temper-lore-book",
  slug: "song-of-despair",
  title: "Song of Despair",
  collection: "temper-lore-collection/words-of-the-poets",
  esoBookId: 667,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
