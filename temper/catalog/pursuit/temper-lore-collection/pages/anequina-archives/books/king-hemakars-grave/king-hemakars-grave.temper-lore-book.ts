import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const kingHemakarsGrave = {
  id: "01a0d60b-2345-7900-8339-683c212eba09",
  type: "page-type/temper-lore-book",
  slug: "king-hemakars-grave",
  title: "King Hemakar's Grave",
  collection: "temper-lore-collection/anequina-archives",
  esoBookId: 5434,
  bookIndex: 19,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
