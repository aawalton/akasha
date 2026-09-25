import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const dealingWithQuitters = {
  id: "01a0d5f1-f451-7329-b1bf-e9313a7ac94f",
  type: "page-type/temper-lore-book",
  slug: "dealing-with-quitters",
  title: "Dealing with Quitters",
  collection: "temper-lore-collection/criminal-correspondence",
  esoBookId: 97,
  bookIndex: 5,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
