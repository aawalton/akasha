import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const onMarshGiantsAStudy = {
  id: "01a0d60b-fdb0-7142-962e-5b7917e96b38",
  type: "page-type/temper-lore-book",
  slug: "on-marsh-giants-a-study",
  title: "On Marsh Giants: A Study",
  collection: "temper-lore-collection/books-of-blackwood",
  esoBookId: 6527,
  bookIndex: 71,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
