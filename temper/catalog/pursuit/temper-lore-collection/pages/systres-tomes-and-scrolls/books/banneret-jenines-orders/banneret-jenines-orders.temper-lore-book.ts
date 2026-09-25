import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const banneretJeninesOrders = {
  id: "01a0d60c-75b4-7dc7-bfbf-be12106ade9c",
  type: "page-type/temper-lore-book",
  slug: "banneret-jenines-orders",
  title: "Banneret Jenine's Orders",
  collection: "temper-lore-collection/systres-tomes-and-scrolls",
  esoBookId: 7021,
  bookIndex: 34,
  charted: true,
  quest: 6765,
  positions: "jsonl",
} as const satisfies TemperLoreBook
