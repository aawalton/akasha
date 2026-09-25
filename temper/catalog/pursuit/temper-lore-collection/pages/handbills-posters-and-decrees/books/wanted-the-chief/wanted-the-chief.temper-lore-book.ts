import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const wantedTheChief = {
  id: "01a0d5f2-83a3-71ab-b807-72178f4b380d",
  type: "page-type/temper-lore-book",
  slug: "wanted-the-chief",
  title: "Wanted: The Chief",
  collection: "temper-lore-collection/handbills-posters-and-decrees",
  esoBookId: 856,
  bookIndex: 29,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
