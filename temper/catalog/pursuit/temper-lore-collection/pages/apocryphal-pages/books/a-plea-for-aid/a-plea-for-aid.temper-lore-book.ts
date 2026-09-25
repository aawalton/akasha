import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aPleaForAid = {
  id: "01a0d60d-156d-7531-823b-6fd24541467f",
  type: "page-type/temper-lore-book",
  slug: "a-plea-for-aid",
  title: "A Plea for Aid",
  collection: "temper-lore-collection/apocryphal-pages",
  esoBookId: 7679,
  bookIndex: 53,
  charted: true,
  quest: 6994,
  positions: "jsonl",
} as const satisfies TemperLoreBook
