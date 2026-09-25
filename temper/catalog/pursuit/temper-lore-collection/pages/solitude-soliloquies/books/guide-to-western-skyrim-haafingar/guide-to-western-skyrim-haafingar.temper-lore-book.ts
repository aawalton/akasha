import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const guideToWesternSkyrimHaafingar = {
  id: "01a0d60b-8107-72cb-a35a-516c9403960e",
  type: "page-type/temper-lore-book",
  slug: "guide-to-western-skyrim-haafingar",
  title: "Guide to Western Skyrim: Haafingar",
  collection: "temper-lore-collection/solitude-soliloquies",
  esoBookId: 6229,
  bookIndex: 40,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
