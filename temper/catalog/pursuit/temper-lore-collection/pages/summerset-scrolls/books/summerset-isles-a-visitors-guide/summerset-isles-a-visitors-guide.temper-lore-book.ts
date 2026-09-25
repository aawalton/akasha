import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const summersetIslesAVisitorsGuide = {
  id: "01a0d60a-d5bd-7d1c-8bfd-888b6c370f4e",
  type: "page-type/temper-lore-book",
  slug: "summerset-isles-a-visitors-guide",
  title: "Summerset Isles: A Visitor's Guide",
  collection: "temper-lore-collection/summerset-scrolls",
  esoBookId: 5118,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
