import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const shamanMoramatsOrders = {
  id: "01a0d5f4-c389-794e-bbce-a81fbf0d94b6",
  type: "page-type/temper-lore-book",
  slug: "shaman-moramats-orders",
  title: "Shaman Moramat's Orders",
  collection: "temper-lore-collection/plots-and-schemes",
  esoBookId: 1288,
  bookIndex: 47,
  charted: true,
  quest: 4070,
  positions: "jsonl",
} as const satisfies TemperLoreBook
