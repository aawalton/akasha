import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theTrialOfMartialKnowledge = {
  id: "01a0d5f1-c91b-752d-bcde-ad78b74bb62c",
  type: "page-type/temper-lore-book",
  slug: "the-trial-of-martial-knowledge",
  title: "The Trial of Martial Knowledge",
  collection: "temper-lore-collection/craglorn-secrets",
  esoBookId: 2376,
  bookIndex: 22,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
