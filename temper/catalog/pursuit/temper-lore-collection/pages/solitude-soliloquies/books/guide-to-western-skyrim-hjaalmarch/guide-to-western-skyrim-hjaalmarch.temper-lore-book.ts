import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const guideToWesternSkyrimHjaalmarch = {
  id: "01a0d60b-8107-7081-bbed-b0c59d7e923a",
  type: "page-type/temper-lore-book",
  slug: "guide-to-western-skyrim-hjaalmarch",
  title: "Guide to Western Skyrim: Hjaalmarch",
  collection: "temper-lore-collection/solitude-soliloquies",
  esoBookId: 6235,
  bookIndex: 64,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
