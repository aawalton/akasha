import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const thePerfectHost = {
  id: "01a0d5f3-3fdb-73dc-ae2a-b9320ea6c3f8",
  type: "page-type/temper-lore-book",
  slug: "the-perfect-host",
  title: "The Perfect Host",
  collection: "temper-lore-collection/lore-and-culture",
  esoBookId: 1538,
  bookIndex: 68,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
