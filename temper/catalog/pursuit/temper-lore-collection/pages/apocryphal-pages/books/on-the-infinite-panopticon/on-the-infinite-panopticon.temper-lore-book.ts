import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const onTheInfinitePanopticon = {
  id: "01a0d60d-156e-7f4f-ab61-e2d7d7eb949c",
  type: "page-type/temper-lore-book",
  slug: "on-the-infinite-panopticon",
  title: "On the Infinite Panopticon",
  collection: "temper-lore-collection/apocryphal-pages",
  esoBookId: 7681,
  bookIndex: 7,
  charted: true,
  quest: 6975,
  positions: "jsonl",
} as const satisfies TemperLoreBook
