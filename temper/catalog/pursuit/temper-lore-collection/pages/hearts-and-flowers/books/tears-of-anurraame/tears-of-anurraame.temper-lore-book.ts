import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const tearsOfAnurraame = {
  id: "01a0d5f2-af70-70ea-9c59-7a53ef69ac6f",
  type: "page-type/temper-lore-book",
  slug: "tears-of-anurraame",
  title: "Tears of Anurraame",
  collection: "temper-lore-collection/hearts-and-flowers",
  esoBookId: 1983,
  bookIndex: 56,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
