import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const onTheBeautyOfOgres = {
  id: "01a0d5f6-1c16-7820-ac63-26cdae9fce59",
  type: "page-type/temper-lore-book",
  slug: "on-the-beauty-of-ogres",
  title: "On the Beauty of Ogres",
  collection: "temper-lore-collection/words-of-the-poets",
  esoBookId: 1911,
  bookIndex: 61,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
