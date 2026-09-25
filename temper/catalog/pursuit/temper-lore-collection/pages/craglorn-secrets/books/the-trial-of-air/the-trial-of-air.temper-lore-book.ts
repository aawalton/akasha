import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theTrialOfAir = {
  id: "01a0d5f1-c91b-7278-a0f1-64b68d0ab885",
  type: "page-type/temper-lore-book",
  slug: "the-trial-of-air",
  title: "The Trial of Air",
  collection: "temper-lore-collection/craglorn-secrets",
  esoBookId: 2378,
  bookIndex: 24,
  charted: true,
  quest: 5751,
  positions: "jsonl",
} as const satisfies TemperLoreBook
