import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const officialMissiveFromHolgunn = {
  id: "01a0d5f3-7053-73c0-aaa4-c3e1d7392d81",
  type: "page-type/temper-lore-book",
  slug: "official-missive-from-holgunn",
  title: "Official Missive from Holgunn",
  collection: "temper-lore-collection/military-orders-and-reports",
  esoBookId: 1012,
  bookIndex: 45,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
