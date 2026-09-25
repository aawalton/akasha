import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theInterrogationOfHenghild = {
  id: "01a0d5f1-f452-757a-9a77-14b70cbe42e4",
  type: "page-type/temper-lore-book",
  slug: "the-interrogation-of-henghild",
  title: "The Interrogation of Henghild",
  collection: "temper-lore-collection/criminal-correspondence",
  esoBookId: 1091,
  bookIndex: 31,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
