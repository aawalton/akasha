import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theseDamnedCats = {
  id: "01a0d5f3-7054-799e-a9bd-7a7e0d5bf7ec",
  type: "page-type/temper-lore-book",
  slug: "these-damned-cats",
  title: "These Damned Cats",
  collection: "temper-lore-collection/military-orders-and-reports",
  esoBookId: 1645,
  bookIndex: 60,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
