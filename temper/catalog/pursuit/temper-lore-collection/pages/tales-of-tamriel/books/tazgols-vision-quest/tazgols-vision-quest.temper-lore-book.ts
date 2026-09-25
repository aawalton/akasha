import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const tazgolsVisionQuest = {
  id: "01a0d5f5-7767-75f7-adff-01d5d07f14aa",
  type: "page-type/temper-lore-book",
  slug: "tazgols-vision-quest",
  title: "Tazgol's Vision Quest",
  collection: "temper-lore-collection/tales-of-tamriel",
  esoBookId: 1357,
  bookIndex: 65,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
