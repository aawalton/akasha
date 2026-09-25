import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const voshRakhOrders = {
  id: "01a0d5f6-d68c-7d3e-bf90-11a732c84ded",
  type: "page-type/temper-lore-book",
  slug: "vosh-rakh-orders",
  title: "Vosh Rakh Orders",
  collection: "temper-lore-collection/wrothgar-writings",
  esoBookId: 3065,
  bookIndex: 85,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
