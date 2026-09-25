import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aSecondWarning = {
  id: "01a0d5f8-02f7-767c-96a9-ebe6d3d7d600",
  type: "page-type/temper-lore-book",
  slug: "a-second-warning",
  title: "A Second Warning",
  collection: "temper-lore-collection/library-of-incunabula",
  esoBookId: 7193,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
