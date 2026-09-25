import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theTrialOfTheTruePath = {
  id: "01a0d5f1-c91b-7e26-af0f-1888abe32251",
  type: "page-type/temper-lore-book",
  slug: "the-trial-of-the-true-path",
  title: "The Trial of the True Path",
  collection: "temper-lore-collection/craglorn-secrets",
  esoBookId: 2379,
  bookIndex: 25,
  charted: true,
  quest: 5751,
  positions: "jsonl",
} as const satisfies TemperLoreBook
