import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const burialSiteOrders = {
  id: "01a0d60e-45b2-7fa6-8356-49549ead5c38",
  type: "page-type/temper-lore-book",
  slug: "burial-site-orders",
  title: "Burial Site Orders",
  collection: "temper-lore-collection/solstice-summations-part-2",
  esoBookId: 8316,
  bookIndex: 18,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
