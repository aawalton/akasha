import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theHiddenTrials = {
  id: "01a0d5f1-c91b-7875-9541-7709e3ea182a",
  type: "page-type/temper-lore-book",
  slug: "the-hidden-trials",
  title: "The Hidden Trials",
  collection: "temper-lore-collection/craglorn-secrets",
  esoBookId: 2380,
  bookIndex: 26,
  charted: true,
  quest: 5751,
  positions: "jsonl",
} as const satisfies TemperLoreBook
