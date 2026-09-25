import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const pathOfTheFaithful = {
  id: "01a0d5f6-d68b-7f99-995b-9f13920956b8",
  type: "page-type/temper-lore-book",
  slug: "path-of-the-faithful",
  title: "Path of the Faithful",
  collection: "temper-lore-collection/wrothgar-writings",
  esoBookId: 3153,
  bookIndex: 76,
  charted: true,
  quest: 5340,
  positions: "jsonl",
} as const satisfies TemperLoreBook
