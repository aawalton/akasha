import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const toWearDreadMantle = {
  id: "01a0d60b-2346-752b-8c8d-ed16d1d27fa7",
  type: "page-type/temper-lore-book",
  slug: "to-wear-dread-mantle",
  title: "To Wear Dread Mantle",
  collection: "temper-lore-collection/anequina-archives",
  esoBookId: 5484,
  bookIndex: 36,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
