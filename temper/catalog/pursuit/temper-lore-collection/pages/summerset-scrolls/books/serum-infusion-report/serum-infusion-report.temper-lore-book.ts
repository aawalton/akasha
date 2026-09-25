import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const serumInfusionReport = {
  id: "01a0d60a-d5bd-715c-ba8f-1f4d2c89e300",
  type: "page-type/temper-lore-book",
  slug: "serum-infusion-report",
  title: "Serum Infusion Report",
  collection: "temper-lore-collection/summerset-scrolls",
  esoBookId: 4900,
  bookIndex: 85,
  charted: true,
  quest: 6121,
  positions: "jsonl",
} as const satisfies TemperLoreBook
