import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aTreatiseOnTheKnot = {
  id: "01a0d5f2-db25-70e2-ba87-49106c86e574",
  type: "page-type/temper-lore-book",
  slug: "a-treatise-on-the-knot",
  title: "A Treatise on the Knot",
  collection: "temper-lore-collection/houses-shops-and-trade",
  esoBookId: 647,
  bookIndex: 25,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
