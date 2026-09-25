import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const onimirilsWritings = {
  id: "01a0d60b-fdb0-7573-9530-31b4cdfd123a",
  type: "page-type/temper-lore-book",
  slug: "onimirils-writings",
  title: "Onimiril's Writings",
  collection: "temper-lore-collection/books-of-blackwood",
  esoBookId: 6690,
  bookIndex: 31,
  charted: true,
  quest: 6667,
  positions: "jsonl",
} as const satisfies TemperLoreBook
