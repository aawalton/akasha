import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const beware = {
  id: "01a0d5f6-1c15-77fb-bf94-ebd3dd2336c8",
  type: "page-type/temper-lore-book",
  slug: "beware",
  title: "Beware!",
  collection: "temper-lore-collection/words-of-the-poets",
  esoBookId: 2516,
  bookIndex: 67,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
