import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const distributionNotes = {
  id: "01a0d5f2-db26-7009-8ca4-2cb115bbc821",
  type: "page-type/temper-lore-book",
  slug: "distribution-notes",
  title: "Distribution Notes",
  collection: "temper-lore-collection/houses-shops-and-trade",
  esoBookId: 1456,
  bookIndex: 55,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
