import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const forGlory = {
  id: "01a0d5f2-83a2-7980-8bd7-70434cd3b326",
  type: "page-type/temper-lore-book",
  slug: "for-glory",
  title: "For Glory!",
  collection: "temper-lore-collection/handbills-posters-and-decrees",
  esoBookId: 4105,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
