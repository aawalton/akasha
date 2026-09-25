import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theHistsFire = {
  id: "01a0d5f2-af70-7cae-aaf4-2fa188ca3c6b",
  type: "page-type/temper-lore-book",
  slug: "the-hists-fire",
  title: "The Hist's Fire",
  collection: "temper-lore-collection/hearts-and-flowers",
  esoBookId: 1360,
  bookIndex: 42,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
