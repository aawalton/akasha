import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const ascendantChampionOrders = {
  id: "01a0d60c-18bc-707a-8cd8-ee1f1408c793",
  type: "page-type/temper-lore-book",
  slug: "ascendant-champion-orders",
  title: "Ascendant Champion Orders",
  collection: "temper-lore-collection/the-impresarios-catalogue",
  esoBookId: 7097,
  bookIndex: 7,
  charted: true,
  quest: 6751,
  positions: "jsonl",
} as const satisfies TemperLoreBook
