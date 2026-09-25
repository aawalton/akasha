import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theDangerOfDefiance = {
  id: "01a0d5f4-c389-7f73-be1d-fe9cda1c1c5f",
  type: "page-type/temper-lore-book",
  slug: "the-danger-of-defiance",
  title: "The Danger of Defiance",
  collection: "temper-lore-collection/plots-and-schemes",
  esoBookId: 558,
  bookIndex: 14,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
