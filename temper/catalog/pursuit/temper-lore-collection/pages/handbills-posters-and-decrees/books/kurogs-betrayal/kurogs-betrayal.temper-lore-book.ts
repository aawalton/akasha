import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const kurogsBetrayal = {
  id: "01a0d5f2-83a2-78d4-adff-76d7268fd44a",
  type: "page-type/temper-lore-book",
  slug: "kurogs-betrayal",
  title: "Kurog's Betrayal",
  collection: "temper-lore-collection/handbills-posters-and-decrees",
  esoBookId: 1298,
  bookIndex: 53,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
