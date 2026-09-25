import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const talesOfBlackMarsh = {
  id: "01a0d60b-fdb1-724e-8098-84539d59148c",
  type: "page-type/temper-lore-book",
  slug: "tales-of-black-marsh",
  title: "Tales of Black Marsh",
  collection: "temper-lore-collection/books-of-blackwood",
  esoBookId: 6598,
  bookIndex: 85,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
