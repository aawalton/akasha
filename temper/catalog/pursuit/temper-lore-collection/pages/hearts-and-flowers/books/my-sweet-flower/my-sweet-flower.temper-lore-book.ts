import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const mySweetFlower = {
  id: "01a0d5f2-af70-733c-9641-026d58ef05bb",
  type: "page-type/temper-lore-book",
  slug: "my-sweet-flower",
  title: "My Sweet Flower",
  collection: "temper-lore-collection/hearts-and-flowers",
  esoBookId: 2100,
  bookIndex: 62,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
