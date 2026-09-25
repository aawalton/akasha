import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const reportOnWingRotCurativeTrials = {
  id: "01a0d5f5-1385-74f5-8b2f-995dcf47e088",
  type: "page-type/temper-lore-book",
  slug: "report-on-wing-rot-curative-trials",
  title: "Report on Wing Rot Curative Trials",
  collection: "temper-lore-collection/research-notes",
  esoBookId: 5088,
  bookIndex: 100,
  charted: true,
  quest: 6121,
  positions: "jsonl",
} as const satisfies TemperLoreBook
