import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const gryphonWatchingLog = {
  id: "01a0d5f8-02f8-72a9-9fca-84cbba9f0ed3",
  type: "page-type/temper-lore-book",
  slug: "gryphon-watching-log",
  title: "Gryphon Watching Log",
  collection: "temper-lore-collection/library-of-incunabula",
  esoBookId: 6856,
  bookIndex: 97,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
