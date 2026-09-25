import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theMonochromePaintbrush = {
  id: "01a0d60a-f1ec-7f0b-9913-255a62ce221b",
  type: "page-type/temper-lore-book",
  slug: "the-monochrome-paintbrush",
  title: "The Monochrome Paintbrush",
  collection: "temper-lore-collection/moawita-memories",
  esoBookId: 4829,
  bookIndex: 15,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
