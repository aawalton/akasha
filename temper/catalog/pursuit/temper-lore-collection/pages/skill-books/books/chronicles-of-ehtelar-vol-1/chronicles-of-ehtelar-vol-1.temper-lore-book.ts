import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const chroniclesOfEhtelarVol1 = {
  id: "01a0d5f6-6d40-74a5-b8cc-44816b74f3ad",
  type: "page-type/temper-lore-book",
  slug: "chronicles-of-ehtelar-vol-1",
  title: "Chronicles of Ehtelar, Vol. 1",
  collection: "temper-lore-collection/skill-books",
  esoBookId: 1840,
  bookIndex: 81,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
