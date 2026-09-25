import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theTrialOfTheArena = {
  id: "01a0d5f1-c91b-7793-83fa-8307df85718c",
  type: "page-type/temper-lore-book",
  slug: "the-trial-of-the-arena",
  title: "The Trial of the Arena",
  collection: "temper-lore-collection/craglorn-secrets",
  esoBookId: 2377,
  bookIndex: 23,
  charted: true,
  quest: 5751,
  positions: "jsonl",
} as const satisfies TemperLoreBook
