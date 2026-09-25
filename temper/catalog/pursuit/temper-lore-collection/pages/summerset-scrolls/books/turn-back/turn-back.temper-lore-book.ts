import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const turnBack = {
  id: "01a0d60a-d5be-763d-b0bb-9a1bd5fee231",
  type: "page-type/temper-lore-book",
  slug: "turn-back",
  title: "Turn Back!",
  collection: "temper-lore-collection/summerset-scrolls",
  esoBookId: 4905,
  bookIndex: 87,
  charted: true,
  quest: 6146,
  positions: "jsonl",
} as const satisfies TemperLoreBook
