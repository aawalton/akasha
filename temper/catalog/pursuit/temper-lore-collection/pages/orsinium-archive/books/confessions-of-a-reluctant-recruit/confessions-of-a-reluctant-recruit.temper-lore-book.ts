import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const confessionsOfAReluctantRecruit = {
  id: "01a0d5f7-160b-743f-9094-7c23bd46f3c0",
  type: "page-type/temper-lore-book",
  slug: "confessions-of-a-reluctant-recruit",
  title: "Confessions of a Reluctant Recruit",
  collection: "temper-lore-collection/orsinium-archive",
  esoBookId: 3226,
  bookIndex: 42,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
