import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const kingsHavenTerritoryRecord = {
  id: "01a0d60a-d5bd-775c-bcea-dcf96d2688e8",
  type: "page-type/temper-lore-book",
  slug: "kings-haven-territory-record",
  title: "King's Haven Territory Record",
  collection: "temper-lore-collection/summerset-scrolls",
  esoBookId: 4981,
  bookIndex: 97,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
