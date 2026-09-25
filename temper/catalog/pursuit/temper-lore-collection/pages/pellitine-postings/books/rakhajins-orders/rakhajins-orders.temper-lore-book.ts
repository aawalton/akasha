import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const rakhajinsOrders = {
  id: "01a0d60b-4e03-745f-9cd9-488110b2806f",
  type: "page-type/temper-lore-book",
  slug: "rakhajins-orders",
  title: "Ra'khajin's Orders",
  collection: "temper-lore-collection/pellitine-postings",
  esoBookId: 5736,
  bookIndex: 6,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
