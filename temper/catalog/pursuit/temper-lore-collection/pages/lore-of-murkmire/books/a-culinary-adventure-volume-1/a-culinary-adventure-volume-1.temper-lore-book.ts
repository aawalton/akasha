import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aCulinaryAdventureVolume1 = {
  id: "01a0d5f6-a298-7e79-b9f2-12cd3dd3cb2c",
  type: "page-type/temper-lore-book",
  slug: "a-culinary-adventure-volume-1",
  title: "A Culinary Adventure, Volume 1",
  collection: "temper-lore-collection/lore-of-murkmire",
  esoBookId: 2809,
  bookIndex: 10,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
