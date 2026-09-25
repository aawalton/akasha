import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const jonesBlessing = {
  id: "01a0d5f4-07b8-7c61-9cf3-4338794f17ce",
  type: "page-type/temper-lore-book",
  slug: "jones-blessing",
  title: "Jone's Blessing",
  collection: "temper-lore-collection/mysteries-and-clues",
  esoBookId: 5415,
  bookIndex: 96,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
