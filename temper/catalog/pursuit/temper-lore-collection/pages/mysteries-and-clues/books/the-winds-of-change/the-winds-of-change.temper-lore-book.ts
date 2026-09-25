import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theWindsOfChange = {
  id: "01a0d5f4-07b9-7246-a0fc-29579b8d87e7",
  type: "page-type/temper-lore-book",
  slug: "the-winds-of-change",
  title: "The Winds of Change",
  collection: "temper-lore-collection/mysteries-and-clues",
  esoBookId: 1370,
  bookIndex: 33,
  charted: true,
  quest: 3916,
  positions: "jsonl",
} as const satisfies TemperLoreBook
