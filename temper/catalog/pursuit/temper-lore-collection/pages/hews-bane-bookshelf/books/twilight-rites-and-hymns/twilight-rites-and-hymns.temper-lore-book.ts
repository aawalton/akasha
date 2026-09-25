import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const twilightRitesAndHymns = {
  id: "01a0d5f7-4294-782e-95a1-fbae588fbd41",
  type: "page-type/temper-lore-book",
  slug: "twilight-rites-and-hymns",
  title: "Twilight Rites and Hymns",
  collection: "temper-lore-collection/hews-bane-bookshelf",
  esoBookId: 3334,
  bookIndex: 5,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
