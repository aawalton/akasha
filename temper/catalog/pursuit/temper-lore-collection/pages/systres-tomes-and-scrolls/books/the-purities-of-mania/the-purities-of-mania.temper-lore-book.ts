import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const thePuritiesOfMania = {
  id: "01a0d60c-75b6-74c2-b06f-c3f615eb79e7",
  type: "page-type/temper-lore-book",
  slug: "the-purities-of-mania",
  title: "The Purities of Mania",
  collection: "temper-lore-collection/systres-tomes-and-scrolls",
  esoBookId: 7179,
  bookIndex: 54,
  charted: true,
  quest: 6771,
  positions: "jsonl",
} as const satisfies TemperLoreBook
