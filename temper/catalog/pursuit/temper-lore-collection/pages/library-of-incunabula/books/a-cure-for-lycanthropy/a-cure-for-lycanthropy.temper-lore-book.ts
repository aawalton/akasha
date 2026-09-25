import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aCureForLycanthropy = {
  id: "01a0d5f8-02f7-72cf-bb7d-3d11d1df5ccc",
  type: "page-type/temper-lore-book",
  slug: "a-cure-for-lycanthropy",
  title: "A Cure for Lycanthropy",
  collection: "temper-lore-collection/library-of-incunabula",
  esoBookId: 5042,
  bookIndex: 42,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
