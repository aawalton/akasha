import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const betnikhLimerikh = {
  id: "01a0d5f6-1c15-7094-9a8d-8c9fc0a80c86",
  type: "page-type/temper-lore-book",
  slug: "betnikh-limerikh",
  title: "Betnikh Limerikh",
  collection: "temper-lore-collection/words-of-the-poets",
  esoBookId: 1010,
  bookIndex: 34,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
