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
  createdAt: "2026-09-25T00:23:07.803Z",
  updatedAt: "2026-09-25T00:23:09.000Z",
} as const satisfies TemperLoreBook
