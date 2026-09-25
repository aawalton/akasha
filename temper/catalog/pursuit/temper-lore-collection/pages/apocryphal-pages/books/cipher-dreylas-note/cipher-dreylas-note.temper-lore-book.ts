import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const cipherDreylasNote = {
  id: "01a0d60d-156d-71b6-a003-5d55ac713457",
  type: "page-type/temper-lore-book",
  slug: "cipher-dreylas-note",
  title: "Cipher Dreyla's Note",
  collection: "temper-lore-collection/apocryphal-pages",
  esoBookId: 7643,
  bookIndex: 48,
  charted: true,
  quest: 7049,
  positions: "jsonl",
} as const satisfies TemperLoreBook
