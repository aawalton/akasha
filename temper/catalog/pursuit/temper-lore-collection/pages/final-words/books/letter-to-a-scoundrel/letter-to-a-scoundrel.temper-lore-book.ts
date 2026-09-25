import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToAScoundrel = {
  id: "01a0d5f6-45ad-743b-848a-ed8c5b6c219e",
  type: "page-type/temper-lore-book",
  slug: "letter-to-a-scoundrel",
  title: "Letter to a Scoundrel",
  collection: "temper-lore-collection/final-words",
  esoBookId: 1534,
  bookIndex: 34,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
