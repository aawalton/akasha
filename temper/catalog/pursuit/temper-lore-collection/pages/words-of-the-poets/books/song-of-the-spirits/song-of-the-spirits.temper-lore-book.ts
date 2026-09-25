import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const songOfTheSpirits = {
  id: "01a0d5f6-1c16-704a-916e-e8e1ecd89504",
  type: "page-type/temper-lore-book",
  slug: "song-of-the-spirits",
  title: "Song of the Spirits",
  collection: "temper-lore-collection/words-of-the-poets",
  esoBookId: 403,
  bookIndex: 8,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
