import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const kothollsContract = {
  id: "01a0d5f2-db26-758c-9231-4dc92e7b7328",
  type: "page-type/temper-lore-book",
  slug: "kotholls-contract",
  title: "Kotholl's Contract",
  collection: "temper-lore-collection/houses-shops-and-trade",
  esoBookId: 656,
  bookIndex: 27,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
