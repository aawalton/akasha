import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theMysteriesOfMoravagarlis = {
  id: "01a0d5f5-1386-7e41-b1ec-6af017ddedb8",
  type: "page-type/temper-lore-book",
  slug: "the-mysteries-of-moravagarlis",
  title: "The Mysteries of Moravagarlis",
  collection: "temper-lore-collection/research-notes",
  esoBookId: 911,
  bookIndex: 31,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
