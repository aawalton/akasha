import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const staggerAndSway = {
  id: "01a0d5f6-1c16-7fe9-8581-d62fefe51bee",
  type: "page-type/temper-lore-book",
  slug: "stagger-and-sway",
  title: "Stagger and Sway",
  collection: "temper-lore-collection/words-of-the-poets",
  esoBookId: 1035,
  bookIndex: 36,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
