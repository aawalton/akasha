import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const timeToStrike = {
  id: "01a0d5f2-253c-73a9-b9b6-799c5ad7a28a",
  type: "page-type/temper-lore-book",
  slug: "time-to-strike",
  title: "Time to Strike!",
  collection: "temper-lore-collection/daedric-cults",
  esoBookId: 2244,
  bookIndex: 75,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
