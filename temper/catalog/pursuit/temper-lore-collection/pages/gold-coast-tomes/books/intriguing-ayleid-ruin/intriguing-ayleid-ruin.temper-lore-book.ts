import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const intriguingAyleidRuin = {
  id: "01a0d5f7-73fa-756d-bcdb-8e22bef403cb",
  type: "page-type/temper-lore-book",
  slug: "intriguing-ayleid-ruin",
  title: "Intriguing Ayleid Ruin",
  collection: "temper-lore-collection/gold-coast-tomes",
  esoBookId: 3655,
  bookIndex: 69,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
