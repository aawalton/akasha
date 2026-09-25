import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const giantsADiscourse = {
  id: "01a0d5f5-f3e3-7832-bfc0-016e2f06434f",
  type: "page-type/temper-lore-book",
  slug: "giants-a-discourse",
  title: "Giants: A Discourse",
  collection: "temper-lore-collection/the-world-and-its-creatures",
  esoBookId: 372,
  bookIndex: 3,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
