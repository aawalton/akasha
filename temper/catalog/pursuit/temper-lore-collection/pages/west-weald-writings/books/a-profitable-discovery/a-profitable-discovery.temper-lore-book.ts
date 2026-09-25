import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aProfitableDiscovery = {
  id: "01a0d60d-4aae-75ed-8575-e1c727d581d8",
  type: "page-type/temper-lore-book",
  slug: "a-profitable-discovery",
  title: "A Profitable Discovery",
  collection: "temper-lore-collection/west-weald-writings",
  esoBookId: 7886,
  bookIndex: 22,
  charted: true,
  quest: 7180,
  positions: "jsonl",
} as const satisfies TemperLoreBook
