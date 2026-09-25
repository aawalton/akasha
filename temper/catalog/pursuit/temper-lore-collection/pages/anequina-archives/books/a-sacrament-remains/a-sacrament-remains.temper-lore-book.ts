import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aSacramentRemains = {
  id: "01a0d60b-2344-7aae-ad6e-cf10deb4d6f0",
  type: "page-type/temper-lore-book",
  slug: "a-sacrament-remains",
  title: "A Sacrament Remains",
  collection: "temper-lore-collection/anequina-archives",
  esoBookId: 5594,
  bookIndex: 52,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
