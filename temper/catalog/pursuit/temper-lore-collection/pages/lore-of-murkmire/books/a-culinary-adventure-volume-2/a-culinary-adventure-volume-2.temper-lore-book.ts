import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aCulinaryAdventureVolume2 = {
  id: "01a0d5f6-a298-7595-b462-bddb81cce633",
  type: "page-type/temper-lore-book",
  slug: "a-culinary-adventure-volume-2",
  title: "A Culinary Adventure, Volume 2",
  collection: "temper-lore-collection/lore-of-murkmire",
  esoBookId: 2810,
  bookIndex: 11,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
