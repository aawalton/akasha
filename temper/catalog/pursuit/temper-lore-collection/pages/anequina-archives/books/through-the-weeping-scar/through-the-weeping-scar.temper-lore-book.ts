import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const throughTheWeepingScar = {
  id: "01a0d60b-2346-726b-accf-ee4e9c364208",
  type: "page-type/temper-lore-book",
  slug: "through-the-weeping-scar",
  title: "Through the Weeping Scar",
  collection: "temper-lore-collection/anequina-archives",
  esoBookId: 5428,
  bookIndex: 85,
  charted: true,
  quest: 6316,
  positions: "jsonl",
} as const satisfies TemperLoreBook
