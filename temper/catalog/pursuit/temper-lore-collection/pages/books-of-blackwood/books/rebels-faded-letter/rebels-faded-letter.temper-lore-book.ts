import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const rebelsFadedLetter = {
  id: "01a0d60b-fdb0-7a38-9bf5-2fdf00c5045d",
  type: "page-type/temper-lore-book",
  slug: "rebels-faded-letter",
  title: "Rebel's Faded Letter",
  collection: "temper-lore-collection/books-of-blackwood",
  esoBookId: 6451,
  bookIndex: 53,
  charted: true,
  quest: 6623,
  positions: "jsonl",
} as const satisfies TemperLoreBook
