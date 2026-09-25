import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const galidorsLovePoem = {
  id: "01a0d60a-d5bc-7d7f-91c3-ca9d2209c881",
  type: "page-type/temper-lore-book",
  slug: "galidors-love-poem",
  title: "Galidor's Love Poem",
  collection: "temper-lore-collection/summerset-scrolls",
  esoBookId: 4718,
  bookIndex: 65,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
