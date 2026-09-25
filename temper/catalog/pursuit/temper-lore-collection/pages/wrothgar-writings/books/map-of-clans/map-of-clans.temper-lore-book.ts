import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const mapOfClans = {
  id: "01a0d5f6-d68b-70e0-ae4d-82598643ba97",
  type: "page-type/temper-lore-book",
  slug: "map-of-clans",
  title: "Map of Clans",
  collection: "temper-lore-collection/wrothgar-writings",
  esoBookId: 3116,
  bookIndex: 67,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
