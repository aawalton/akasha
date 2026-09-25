import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aFinalAppeal = {
  id: "01a0d5f2-253a-75e7-8559-76b355b4a165",
  type: "page-type/temper-lore-book",
  slug: "a-final-appeal",
  title: "A Final Appeal",
  collection: "temper-lore-collection/daedric-cults",
  esoBookId: 666,
  bookIndex: 22,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
