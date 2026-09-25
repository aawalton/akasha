import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theTavasBountyLedger = {
  id: "01a0d5f2-db27-786f-a4ca-8efa3d7b21e4",
  type: "page-type/temper-lore-book",
  slug: "the-tavas-bounty-ledger",
  title: "The Tava's Bounty Ledger",
  collection: "temper-lore-collection/houses-shops-and-trade",
  esoBookId: 2444,
  charted: true,
  quest: 2556,
  positions: "jsonl",
} as const satisfies TemperLoreBook
