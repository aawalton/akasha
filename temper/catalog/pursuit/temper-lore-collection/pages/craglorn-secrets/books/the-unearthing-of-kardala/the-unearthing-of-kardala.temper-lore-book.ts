import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theUnearthingOfKardala = {
  id: "01a0d5f1-c91b-75b9-9b08-d37dd6713bed",
  type: "page-type/temper-lore-book",
  slug: "the-unearthing-of-kardala",
  title: "The Unearthing of Kardala",
  collection: "temper-lore-collection/craglorn-secrets",
  esoBookId: 2432,
  bookIndex: 11,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
