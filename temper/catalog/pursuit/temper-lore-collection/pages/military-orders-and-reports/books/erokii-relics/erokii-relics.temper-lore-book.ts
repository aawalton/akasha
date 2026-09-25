import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const erokiiRelics = {
  id: "01a0d5f3-7052-79c5-96c2-9b5f5e1dc059",
  type: "page-type/temper-lore-book",
  slug: "erokii-relics",
  title: "Erokii Relics",
  collection: "temper-lore-collection/military-orders-and-reports",
  esoBookId: 98,
  bookIndex: 4,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
