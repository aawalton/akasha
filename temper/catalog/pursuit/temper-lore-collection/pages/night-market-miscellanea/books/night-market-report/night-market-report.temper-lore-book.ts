import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const nightMarketReport = {
  id: "01a0d60e-687f-71e0-9d77-c361634f6bf2",
  type: "page-type/temper-lore-book",
  slug: "night-market-report",
  title: "Night Market Report",
  collection: "temper-lore-collection/night-market-miscellanea",
  esoBookId: 8710,
  bookIndex: 26,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
