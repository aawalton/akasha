import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const eldersOfBramblebreach = {
  id: "01a0d5f6-1c15-7c4f-b7bc-79c01bdcee0d",
  type: "page-type/temper-lore-book",
  slug: "elders-of-bramblebreach",
  title: "Elders of Bramblebreach",
  collection: "temper-lore-collection/words-of-the-poets",
  esoBookId: 1892,
  bookIndex: 60,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
