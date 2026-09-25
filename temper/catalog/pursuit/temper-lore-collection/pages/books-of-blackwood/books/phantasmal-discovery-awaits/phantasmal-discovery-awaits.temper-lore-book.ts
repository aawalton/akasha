import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const phantasmalDiscoveryAwaits = {
  id: "01a0d60b-fdb0-7eac-ae5c-2c8fd38d7a1a",
  type: "page-type/temper-lore-book",
  slug: "phantasmal-discovery-awaits",
  title: "Phantasmal Discovery Awaits!",
  collection: "temper-lore-collection/books-of-blackwood",
  esoBookId: 6477,
  bookIndex: 32,
  charted: true,
  quest: 6631,
  positions: "jsonl",
} as const satisfies TemperLoreBook
