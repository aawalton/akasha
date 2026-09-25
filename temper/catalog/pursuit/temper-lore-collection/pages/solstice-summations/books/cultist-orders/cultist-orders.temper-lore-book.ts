import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const cultistOrders = {
  id: "01a0d60d-ff69-70c2-9cd2-28b28c68472a",
  type: "page-type/temper-lore-book",
  slug: "cultist-orders",
  title: "Cultist Orders",
  collection: "temper-lore-collection/solstice-summations",
  esoBookId: 8549,
  bookIndex: 85,
  charted: true,
  quest: 7249,
  positions: "jsonl",
} as const satisfies TemperLoreBook
