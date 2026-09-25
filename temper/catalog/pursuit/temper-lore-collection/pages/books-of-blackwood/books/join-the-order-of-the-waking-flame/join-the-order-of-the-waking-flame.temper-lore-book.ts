import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const joinTheOrderOfTheWakingFlame = {
  id: "01a0d60b-fdb0-7550-b454-d09a311d3085",
  type: "page-type/temper-lore-book",
  slug: "join-the-order-of-the-waking-flame",
  title: "Join the Order of the Waking Flame",
  collection: "temper-lore-collection/books-of-blackwood",
  esoBookId: 6734,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
