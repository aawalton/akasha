import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const ordersBearclawMine = {
  id: "01a0d5f2-253b-7d02-ae6c-6373fb98414b",
  type: "page-type/temper-lore-book",
  slug: "orders-bearclaw-mine",
  title: "Orders: Bearclaw Mine",
  collection: "temper-lore-collection/daedric-cults",
  esoBookId: 92,
  bookIndex: 5,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
