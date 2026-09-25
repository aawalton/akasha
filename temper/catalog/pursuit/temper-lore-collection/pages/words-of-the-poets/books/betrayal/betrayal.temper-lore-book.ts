import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const betrayal = {
  id: "01a0d5f6-1c15-78c9-b911-4044869ee282",
  type: "page-type/temper-lore-book",
  slug: "betrayal",
  title: "Betrayal",
  collection: "temper-lore-collection/words-of-the-poets",
  esoBookId: 973,
  bookIndex: 33,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
