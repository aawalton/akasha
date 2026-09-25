import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const thePiper = {
  id: "01a0d5f5-7767-70f3-beda-99fc0fc78330",
  type: "page-type/temper-lore-book",
  slug: "the-piper",
  title: "The Piper",
  collection: "temper-lore-collection/tales-of-tamriel",
  esoBookId: 584,
  bookIndex: 12,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
