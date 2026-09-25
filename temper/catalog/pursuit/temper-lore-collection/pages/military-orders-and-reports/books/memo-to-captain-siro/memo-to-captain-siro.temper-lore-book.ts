import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const memoToCaptainSiro = {
  id: "01a0d5f3-7053-79ae-b3d8-5c5d8ae0c29d",
  type: "page-type/temper-lore-book",
  slug: "memo-to-captain-siro",
  title: "Memo to Captain Siro",
  collection: "temper-lore-collection/military-orders-and-reports",
  esoBookId: 941,
  bookIndex: 42,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
