import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theWondersOfCraglorn = {
  id: "01a0d5f1-c91b-7977-a03c-82d18e3ae5d9",
  type: "page-type/temper-lore-book",
  slug: "the-wonders-of-craglorn",
  title: "The Wonders of Craglorn",
  collection: "temper-lore-collection/craglorn-secrets",
  esoBookId: 2744,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
