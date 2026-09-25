import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const scoutMeerasReport = {
  id: "01a0d5f3-7054-748f-881a-b05990b0ac9a",
  type: "page-type/temper-lore-book",
  slug: "scout-meeras-report",
  title: "Scout Meera's Report",
  collection: "temper-lore-collection/military-orders-and-reports",
  esoBookId: 2938,
  bookIndex: 97,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
