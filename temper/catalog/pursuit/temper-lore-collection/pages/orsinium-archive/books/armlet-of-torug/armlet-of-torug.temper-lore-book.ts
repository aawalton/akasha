import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const armletOfTorug = {
  id: "01a0d5f7-160b-7a0c-85b9-7de0c2767962",
  type: "page-type/temper-lore-book",
  slug: "armlet-of-torug",
  title: "Armlet of Torug",
  collection: "temper-lore-collection/orsinium-archive",
  esoBookId: 3244,
  bookIndex: 53,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
