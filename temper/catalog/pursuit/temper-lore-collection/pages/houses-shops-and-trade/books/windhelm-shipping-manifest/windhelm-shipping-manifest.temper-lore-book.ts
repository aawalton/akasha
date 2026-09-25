import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const windhelmShippingManifest = {
  id: "01a0d5f2-db27-7a03-9f08-cc17314e9357",
  type: "page-type/temper-lore-book",
  slug: "windhelm-shipping-manifest",
  title: "Windhelm Shipping Manifest",
  collection: "temper-lore-collection/houses-shops-and-trade",
  esoBookId: 1386,
  bookIndex: 51,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
