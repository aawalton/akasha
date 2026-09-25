import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const noShiraNoGood = {
  id: "01a0d5f7-4294-79ee-ac52-dd4f5ac3a293",
  type: "page-type/temper-lore-book",
  slug: "no-shira-no-good",
  title: "No Shira, No Good!",
  collection: "temper-lore-collection/hews-bane-bookshelf",
  esoBookId: 3432,
  bookIndex: 13,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
