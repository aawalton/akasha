import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const villageReport = {
  id: "01a0d60e-45b3-7ac6-9200-7bbe811fd9bf",
  type: "page-type/temper-lore-book",
  slug: "village-report",
  title: "Village Report",
  collection: "temper-lore-collection/solstice-summations-part-2",
  esoBookId: 8317,
  bookIndex: 19,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
