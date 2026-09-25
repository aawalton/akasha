import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theMirroredWay = {
  id: "01a0d60c-75b6-7a1e-aab6-acc64e34eee8",
  type: "page-type/temper-lore-book",
  slug: "the-mirrored-way",
  title: "The Mirrored Way",
  collection: "temper-lore-collection/systres-tomes-and-scrolls",
  esoBookId: 7030,
  bookIndex: 51,
  charted: true,
  quest: 6771,
  positions: "jsonl",
} as const satisfies TemperLoreBook
