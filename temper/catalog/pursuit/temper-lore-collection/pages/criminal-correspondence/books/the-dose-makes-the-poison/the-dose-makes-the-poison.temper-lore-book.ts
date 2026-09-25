import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theDoseMakesThePoison = {
  id: "01a0d5f1-f452-75fc-8065-3e51eb9497ac",
  type: "page-type/temper-lore-book",
  slug: "the-dose-makes-the-poison",
  title: "The Dose Makes the Poison",
  collection: "temper-lore-collection/criminal-correspondence",
  esoBookId: 2987,
  bookIndex: 89,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
