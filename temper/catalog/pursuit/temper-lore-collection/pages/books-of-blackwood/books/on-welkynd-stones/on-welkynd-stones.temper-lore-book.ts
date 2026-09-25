import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const onWelkyndStones = {
  id: "01a0d60b-fdb0-787d-9f88-f7ad31144a6c",
  type: "page-type/temper-lore-book",
  slug: "on-welkynd-stones",
  title: "On Welkynd Stones",
  collection: "temper-lore-collection/books-of-blackwood",
  esoBookId: 6704,
  bookIndex: 100,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
