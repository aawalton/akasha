import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const iNeedYourHelp = {
  id: "01a0d60b-fdb0-7812-967e-3b8b59e47c87",
  type: "page-type/temper-lore-book",
  slug: "i-need-your-help",
  title: "I Need Your Help!",
  collection: "temper-lore-collection/books-of-blackwood",
  esoBookId: 6752,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
