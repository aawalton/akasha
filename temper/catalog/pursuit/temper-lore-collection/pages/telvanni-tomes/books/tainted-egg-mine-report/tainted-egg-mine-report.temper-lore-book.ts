import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const taintedEggMineReport = {
  id: "01a0d60c-eb9c-7420-a060-f9c772f55bc7",
  type: "page-type/temper-lore-book",
  slug: "tainted-egg-mine-report",
  title: "Tainted Egg Mine Report",
  collection: "temper-lore-collection/telvanni-tomes",
  esoBookId: 7771,
  bookIndex: 85,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
