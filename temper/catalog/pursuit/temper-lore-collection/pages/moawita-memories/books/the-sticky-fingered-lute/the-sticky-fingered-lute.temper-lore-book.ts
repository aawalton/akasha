import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theStickyFingeredLute = {
  id: "01a0d60a-f1ed-7987-a55a-2db13212ef9b",
  type: "page-type/temper-lore-book",
  slug: "the-sticky-fingered-lute",
  title: "The Sticky-Fingered Lute",
  collection: "temper-lore-collection/moawita-memories",
  esoBookId: 4825,
  bookIndex: 11,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
