import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const saintStental = {
  id: "01a0d5f2-83a3-7f27-9e7f-1c9dfb8c2a05",
  type: "page-type/temper-lore-book",
  slug: "saint-stental",
  title: "Saint Stental",
  collection: "temper-lore-collection/handbills-posters-and-decrees",
  esoBookId: 2246,
  bookIndex: 90,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
