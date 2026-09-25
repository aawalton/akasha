import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theOrderOfTheWakingFlame = {
  id: "01a0d60b-fdb1-75d9-ac1b-b384ab837ee5",
  type: "page-type/temper-lore-book",
  slug: "the-order-of-the-waking-flame",
  title: "The Order of the Waking Flame",
  collection: "temper-lore-collection/books-of-blackwood",
  esoBookId: 6509,
  bookIndex: 34,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
