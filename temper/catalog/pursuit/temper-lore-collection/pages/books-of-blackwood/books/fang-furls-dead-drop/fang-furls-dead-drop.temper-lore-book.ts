import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const fangFurlsDeadDrop = {
  id: "01a0d60b-fdaf-7511-a0b0-1dd9fdfcbf0d",
  type: "page-type/temper-lore-book",
  slug: "fang-furls-dead-drop",
  title: "Fang-Furls' Dead Drop",
  collection: "temper-lore-collection/books-of-blackwood",
  esoBookId: 6667,
  bookIndex: 46,
  charted: true,
  quest: 6658,
  positions: "jsonl",
} as const satisfies TemperLoreBook
