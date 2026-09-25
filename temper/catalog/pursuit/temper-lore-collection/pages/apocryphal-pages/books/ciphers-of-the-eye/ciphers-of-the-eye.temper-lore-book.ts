import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const ciphersOfTheEye = {
  id: "01a0d60d-156d-70d2-b4fd-c9eba25a730e",
  type: "page-type/temper-lore-book",
  slug: "ciphers-of-the-eye",
  title: "Ciphers of the Eye",
  collection: "temper-lore-collection/apocryphal-pages",
  esoBookId: 7451,
  bookIndex: 22,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
