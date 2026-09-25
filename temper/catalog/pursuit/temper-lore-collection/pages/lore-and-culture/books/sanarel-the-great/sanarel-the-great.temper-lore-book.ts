import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const sanarelTheGreat = {
  id: "01a0d5f3-3fdb-7c08-ac17-8950434cb507",
  type: "page-type/temper-lore-book",
  slug: "sanarel-the-great",
  title: "Sanarel the Great",
  collection: "temper-lore-collection/lore-and-culture",
  esoBookId: 1108,
  bookIndex: 29,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
