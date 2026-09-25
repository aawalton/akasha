import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const praiseToMafala = {
  id: "01a0d60b-2345-7f7b-9dbf-2872bac0d0ad",
  type: "page-type/temper-lore-book",
  slug: "praise-to-mafala",
  title: "Praise to Mafala!",
  collection: "temper-lore-collection/anequina-archives",
  esoBookId: 5633,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
