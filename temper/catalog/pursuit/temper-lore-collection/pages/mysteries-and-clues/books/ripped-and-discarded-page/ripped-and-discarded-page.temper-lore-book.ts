import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const rippedAndDiscardedPage = {
  id: "01a0d5f4-07b8-7364-9a34-b40618cee120",
  type: "page-type/temper-lore-book",
  slug: "ripped-and-discarded-page",
  title: "Ripped and Discarded Page",
  collection: "temper-lore-collection/mysteries-and-clues",
  esoBookId: 2086,
  bookIndex: 57,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
