import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const resourcesForLukiul = {
  id: "01a0d5f1-f451-76ab-afd5-e91fd4c9a748",
  type: "page-type/temper-lore-book",
  slug: "resources-for-lukiul",
  title: "Resources for Lukiul",
  collection: "temper-lore-collection/criminal-correspondence",
  esoBookId: 1540,
  bookIndex: 58,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
