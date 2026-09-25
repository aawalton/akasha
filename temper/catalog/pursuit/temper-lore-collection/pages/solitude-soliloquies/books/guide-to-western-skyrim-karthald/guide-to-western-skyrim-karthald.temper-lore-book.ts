import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const guideToWesternSkyrimKarthald = {
  id: "01a0d60b-8107-7db8-ac04-50e35023e8ca",
  type: "page-type/temper-lore-book",
  slug: "guide-to-western-skyrim-karthald",
  title: "Guide to Western Skyrim: Karthald",
  collection: "temper-lore-collection/solitude-soliloquies",
  esoBookId: 6236,
  bookIndex: 65,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
