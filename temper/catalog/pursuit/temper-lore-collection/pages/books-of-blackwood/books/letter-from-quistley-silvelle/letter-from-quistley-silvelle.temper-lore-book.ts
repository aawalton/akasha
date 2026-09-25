import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterFromQuistleySilvelle = {
  id: "01a0d60b-fdb0-7fd7-9d2b-9a51845aaa71",
  type: "page-type/temper-lore-book",
  slug: "letter-from-quistley-silvelle",
  title: "Letter from Quistley Silvelle",
  collection: "temper-lore-collection/books-of-blackwood",
  esoBookId: 6597,
  bookIndex: 42,
  charted: true,
  quest: 6662,
  positions: "jsonl",
} as const satisfies TemperLoreBook
