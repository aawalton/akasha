import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const seaAmriShippingManifest = {
  id: "01a0d5f2-db26-7e90-8f15-1d196df2daf6",
  type: "page-type/temper-lore-book",
  slug: "sea-amri-shipping-manifest",
  title: "Sea Amri Shipping Manifest",
  collection: "temper-lore-collection/houses-shops-and-trade",
  esoBookId: 778,
  bookIndex: 33,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
