import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aTaleForeverTold = {
  id: "01a0d5f5-7766-7268-b995-1f4e071d59ff",
  type: "page-type/temper-lore-book",
  slug: "a-tale-forever-told",
  title: "A Tale Forever Told",
  collection: "temper-lore-collection/tales-of-tamriel",
  esoBookId: 464,
  bookIndex: 6,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
