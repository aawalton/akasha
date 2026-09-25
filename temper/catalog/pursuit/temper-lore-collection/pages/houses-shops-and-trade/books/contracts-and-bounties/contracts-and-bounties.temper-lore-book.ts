import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const contractsAndBounties = {
  id: "01a0d5f2-db25-70fd-9f37-a3c4b55e6be2",
  type: "page-type/temper-lore-book",
  slug: "contracts-and-bounties",
  title: "Contracts and Bounties",
  collection: "temper-lore-collection/houses-shops-and-trade",
  esoBookId: 352,
  bookIndex: 8,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
