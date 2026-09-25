import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const anUnusualAlliance = {
  id: "01a0d5f2-83a2-7a69-bc79-269190f24ed0",
  type: "page-type/temper-lore-book",
  slug: "an-unusual-alliance",
  title: "An Unusual Alliance",
  collection: "temper-lore-collection/handbills-posters-and-decrees",
  esoBookId: 771,
  bookIndex: 22,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
