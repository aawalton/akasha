import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const ordersToKindredRectorNyleth = {
  id: "01a0d60c-eb9c-7b6d-8914-ecbf4cbf6530",
  type: "page-type/temper-lore-book",
  slug: "orders-to-kindred-rector-nyleth",
  title: "Orders to Kindred Rector Nyleth",
  collection: "temper-lore-collection/telvanni-tomes",
  esoBookId: 7650,
  bookIndex: 20,
  charted: true,
  quest: 6974,
  positions: "jsonl",
} as const satisfies TemperLoreBook
