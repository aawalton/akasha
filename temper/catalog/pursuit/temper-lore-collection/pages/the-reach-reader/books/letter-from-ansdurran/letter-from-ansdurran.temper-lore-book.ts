import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterFromAnsdurran = {
  id: "01a0d60b-c958-741e-be12-7abc9beeeed0",
  type: "page-type/temper-lore-book",
  slug: "letter-from-ansdurran",
  title: "Letter from Ansdurran",
  collection: "temper-lore-collection/the-reach-reader",
  esoBookId: 6359,
  bookIndex: 9,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
