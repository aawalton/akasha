import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const exodusFromSummerset = {
  id: "01a0d5f5-7766-71f6-82b3-54ac35d95598",
  type: "page-type/temper-lore-book",
  slug: "exodus-from-summerset",
  title: "Exodus from Summerset",
  collection: "temper-lore-collection/tales-of-tamriel",
  esoBookId: 602,
  bookIndex: 13,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
