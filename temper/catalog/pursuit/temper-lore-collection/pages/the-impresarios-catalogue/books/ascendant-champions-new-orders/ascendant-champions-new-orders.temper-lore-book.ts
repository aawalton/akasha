import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const ascendantChampionsNewOrders = {
  id: "01a0d60c-18bc-7f9e-b277-9e2e7f72af2f",
  type: "page-type/temper-lore-book",
  slug: "ascendant-champions-new-orders",
  title: "Ascendant Champion's New Orders",
  collection: "temper-lore-collection/the-impresarios-catalogue",
  esoBookId: 6968,
  bookIndex: 8,
  charted: true,
  quest: 6761,
  positions: "jsonl",
} as const satisfies TemperLoreBook
