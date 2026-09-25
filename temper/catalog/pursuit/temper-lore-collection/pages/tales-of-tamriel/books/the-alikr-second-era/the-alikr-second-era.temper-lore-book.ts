import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theAlikrSecondEra = {
  id: "01a0d5f5-7767-7dac-bf83-21a8afb3b011",
  type: "page-type/temper-lore-book",
  slug: "the-alikr-second-era",
  title: "The Alik'r (Second Era)",
  collection: "temper-lore-collection/tales-of-tamriel",
  esoBookId: 1519,
  bookIndex: 71,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
