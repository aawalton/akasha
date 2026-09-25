import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const selenesLetter = {
  id: "01a0d5f1-c91b-7239-b698-d61bf99ba874",
  type: "page-type/temper-lore-book",
  slug: "selenes-letter",
  title: "Selene's Letter",
  collection: "temper-lore-collection/craglorn-secrets",
  esoBookId: 2609,
  bookIndex: 37,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
