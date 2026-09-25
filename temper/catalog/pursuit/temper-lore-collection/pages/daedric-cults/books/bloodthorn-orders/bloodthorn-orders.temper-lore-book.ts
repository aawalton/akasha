import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const bloodthornOrders = {
  id: "01a0d5f2-253a-7638-a367-fcce1bfd2706",
  type: "page-type/temper-lore-book",
  slug: "bloodthorn-orders",
  title: "Bloodthorn Orders",
  collection: "temper-lore-collection/daedric-cults",
  esoBookId: 84,
  bookIndex: 2,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
