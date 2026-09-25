import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theBlessedDagger = {
  id: "01a0d5f5-7767-731c-b10a-2c2bdceb56ef",
  type: "page-type/temper-lore-book",
  slug: "the-blessed-dagger",
  title: "The Blessed Dagger",
  collection: "temper-lore-collection/tales-of-tamriel",
  esoBookId: 1630,
  bookIndex: 74,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
