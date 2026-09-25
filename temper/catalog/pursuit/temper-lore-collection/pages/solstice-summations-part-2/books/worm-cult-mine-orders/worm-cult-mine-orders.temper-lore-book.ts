import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const wormCultMineOrders = {
  id: "01a0d60e-45b3-7641-ae31-b62b1039df34",
  type: "page-type/temper-lore-book",
  slug: "worm-cult-mine-orders",
  title: "Worm Cult Mine Orders",
  collection: "temper-lore-collection/solstice-summations-part-2",
  esoBookId: 8310,
  bookIndex: 16,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
