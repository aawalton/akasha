import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const cipherNelfynnsNote = {
  id: "01a0d60d-156d-7c22-bebb-03efda6b009b",
  type: "page-type/temper-lore-book",
  slug: "cipher-nelfynns-note",
  title: "Cipher Nelfynn's Note",
  collection: "temper-lore-collection/apocryphal-pages",
  esoBookId: 7644,
  bookIndex: 49,
  charted: true,
  quest: 7050,
  positions: "jsonl",
} as const satisfies TemperLoreBook
