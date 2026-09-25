import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const bartholomewsDiscovery = {
  id: "01a0d5f8-02f8-76c2-b6c4-0281ca4da3e3",
  type: "page-type/temper-lore-book",
  slug: "bartholomews-discovery",
  title: "Bartholomew's Discovery",
  collection: "temper-lore-collection/library-of-incunabula",
  esoBookId: 6715,
  bookIndex: 88,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
