import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const karisHitList = {
  id: "01a0d5f7-4293-74dd-9b21-d6a2142bfc36",
  type: "page-type/temper-lore-book",
  slug: "karis-hit-list",
  title: "Kari's Hit List",
  collection: "temper-lore-collection/hews-bane-bookshelf",
  esoBookId: 3449,
  bookIndex: 77,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
