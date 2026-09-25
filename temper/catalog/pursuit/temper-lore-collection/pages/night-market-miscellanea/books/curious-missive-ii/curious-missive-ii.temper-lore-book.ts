import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const curiousMissiveIi = {
  id: "01a0d60e-687e-76d1-8651-5ed0576d393f",
  type: "page-type/temper-lore-book",
  slug: "curious-missive-ii",
  title: "Curious Missive II",
  collection: "temper-lore-collection/night-market-miscellanea",
  esoBookId: 8680,
  bookIndex: 11,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
