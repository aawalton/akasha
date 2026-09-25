import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theGraveOfSkar = {
  id: "01a0d5f7-aa99-75c0-b38d-8c43277cd766",
  type: "page-type/temper-lore-book",
  slug: "the-grave-of-skar",
  title: "The Grave of Skar",
  collection: "temper-lore-collection/vvardenfell-volumes",
  esoBookId: 4543,
  bookIndex: 65,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
