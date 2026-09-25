import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToGeldrion = {
  id: "01a0d5f3-0ef8-7d32-9ec5-df6abd420d45",
  type: "page-type/temper-lore-book",
  slug: "letter-to-geldrion",
  title: "Letter to Geldrion",
  collection: "temper-lore-collection/letters-and-missives",
  esoBookId: 2783,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
