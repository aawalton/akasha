import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aChildsTamrielBestiary = {
  id: "01a0d5f6-1c15-7598-a4fe-a5caff314a34",
  type: "page-type/temper-lore-book",
  slug: "a-childs-tamriel-bestiary",
  title: "A Child's Tamriel Bestiary",
  collection: "temper-lore-collection/words-of-the-poets",
  esoBookId: 1253,
  bookIndex: 41,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
