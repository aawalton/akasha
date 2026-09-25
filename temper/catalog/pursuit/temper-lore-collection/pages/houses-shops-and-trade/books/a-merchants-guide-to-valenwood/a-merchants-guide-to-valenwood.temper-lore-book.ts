import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aMerchantsGuideToValenwood = {
  id: "01a0d5f2-db25-7753-9bb1-19cb1383ddd2",
  type: "page-type/temper-lore-book",
  slug: "a-merchants-guide-to-valenwood",
  title: "A Merchant's Guide to Valenwood",
  collection: "temper-lore-collection/houses-shops-and-trade",
  esoBookId: 1887,
  bookIndex: 69,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
