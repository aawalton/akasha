import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const grandMaestroFortesResearch = {
  id: "01a0d60a-d5bc-7966-8879-846cc4cc8166",
  type: "page-type/temper-lore-book",
  slug: "grand-maestro-fortes-research",
  title: "Grand Maestro Forte's Research",
  collection: "temper-lore-collection/summerset-scrolls",
  esoBookId: 4808,
  bookIndex: 48,
  charted: true,
  quest: 6113,
  positions: "jsonl",
} as const satisfies TemperLoreBook
