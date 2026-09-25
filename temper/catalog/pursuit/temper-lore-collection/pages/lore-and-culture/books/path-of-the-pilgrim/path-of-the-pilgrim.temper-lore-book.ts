import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const pathOfThePilgrim = {
  id: "01a0d5f3-3fdb-7aed-9df6-ec688571b50f",
  type: "page-type/temper-lore-book",
  slug: "path-of-the-pilgrim",
  title: "Path of the Pilgrim",
  collection: "temper-lore-collection/lore-and-culture",
  esoBookId: 747,
  bookIndex: 15,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
