import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const litanyOfBlood = {
  id: "01a0d5f7-73fa-74ed-a759-1acdabd75ac9",
  type: "page-type/temper-lore-book",
  slug: "litany-of-blood",
  title: "Litany of Blood",
  collection: "temper-lore-collection/gold-coast-tomes",
  esoBookId: 3516,
  bookIndex: 41,
  charted: true,
  quest: 5634,
  positions: "jsonl",
} as const satisfies TemperLoreBook
