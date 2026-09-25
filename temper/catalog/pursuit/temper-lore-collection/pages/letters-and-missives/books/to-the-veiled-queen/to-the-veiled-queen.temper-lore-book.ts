import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const toTheVeiledQueen = {
  id: "01a0d5f3-0ef9-74de-87e0-a5cdf1c363e8",
  type: "page-type/temper-lore-book",
  slug: "to-the-veiled-queen",
  title: "To The Veiled Queen",
  collection: "temper-lore-collection/letters-and-missives",
  esoBookId: 541,
  bookIndex: 12,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
