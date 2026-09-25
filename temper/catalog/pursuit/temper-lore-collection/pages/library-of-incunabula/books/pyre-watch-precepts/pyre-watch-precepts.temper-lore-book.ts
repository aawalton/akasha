import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const pyreWatchPrecepts = {
  id: "01a0d5f8-02f9-7c36-a386-967855d8bedd",
  type: "page-type/temper-lore-book",
  slug: "pyre-watch-precepts",
  title: "Pyre Watch Precepts",
  collection: "temper-lore-collection/library-of-incunabula",
  esoBookId: 5690,
  bookIndex: 71,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
