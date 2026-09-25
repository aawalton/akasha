import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aCulinaryAdventureVolume3 = {
  id: "01a0d5f6-a298-7586-937e-9e7eb0f0801d",
  type: "page-type/temper-lore-book",
  slug: "a-culinary-adventure-volume-3",
  title: "A Culinary Adventure, Volume 3",
  collection: "temper-lore-collection/lore-of-murkmire",
  esoBookId: 2811,
  bookIndex: 12,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
