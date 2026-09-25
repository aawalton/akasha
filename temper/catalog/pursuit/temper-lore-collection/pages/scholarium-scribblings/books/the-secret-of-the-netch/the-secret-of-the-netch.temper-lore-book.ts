import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theSecretOfTheNetch = {
  id: "01a0d60d-9a64-7298-a0c0-6ec71424d4e9",
  type: "page-type/temper-lore-book",
  slug: "the-secret-of-the-netch",
  title: "The Secret of the Netch",
  collection: "temper-lore-collection/scholarium-scribblings",
  esoBookId: 8159,
  bookIndex: 10,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
