import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aCatsSerenade = {
  id: "01a0d60b-2344-76a5-ba53-ddde54e9a474",
  type: "page-type/temper-lore-book",
  slug: "a-cats-serenade",
  title: "A Cat's Serenade",
  collection: "temper-lore-collection/anequina-archives",
  esoBookId: 5602,
  bookIndex: 59,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
