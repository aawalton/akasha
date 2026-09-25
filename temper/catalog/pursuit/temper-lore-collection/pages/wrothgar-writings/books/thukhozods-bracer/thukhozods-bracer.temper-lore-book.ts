import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const thukhozodsBracer = {
  id: "01a0d5f6-d68c-7917-9d4d-e57ac3de5145",
  type: "page-type/temper-lore-book",
  slug: "thukhozods-bracer",
  title: "Thukhozod's Bracer",
  collection: "temper-lore-collection/wrothgar-writings",
  esoBookId: 3123,
  bookIndex: 69,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
