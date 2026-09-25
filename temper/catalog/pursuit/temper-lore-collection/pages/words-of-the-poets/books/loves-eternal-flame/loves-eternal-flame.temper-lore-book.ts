import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const lovesEternalFlame = {
  id: "01a0d5f6-1c16-70d6-9fcd-93badfc0e270",
  type: "page-type/temper-lore-book",
  slug: "loves-eternal-flame",
  title: "Love's Eternal Flame",
  collection: "temper-lore-collection/words-of-the-poets",
  esoBookId: 936,
  bookIndex: 30,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
