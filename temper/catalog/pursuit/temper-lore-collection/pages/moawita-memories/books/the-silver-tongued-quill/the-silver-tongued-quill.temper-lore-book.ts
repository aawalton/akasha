import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theSilverTonguedQuill = {
  id: "01a0d60a-f1ed-7353-bdc2-b86ff789cea5",
  type: "page-type/temper-lore-book",
  slug: "the-silver-tongued-quill",
  title: "The Silver-Tongued Quill",
  collection: "temper-lore-collection/moawita-memories",
  esoBookId: 4817,
  bookIndex: 3,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
