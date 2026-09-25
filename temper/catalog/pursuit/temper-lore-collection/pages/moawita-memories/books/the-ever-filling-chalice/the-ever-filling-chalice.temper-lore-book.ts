import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theEverFillingChalice = {
  id: "01a0d60a-f1ec-7755-b791-83219440d46e",
  type: "page-type/temper-lore-book",
  slug: "the-ever-filling-chalice",
  title: "The Ever-Filling Chalice",
  collection: "temper-lore-collection/moawita-memories",
  esoBookId: 4832,
  bookIndex: 18,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
