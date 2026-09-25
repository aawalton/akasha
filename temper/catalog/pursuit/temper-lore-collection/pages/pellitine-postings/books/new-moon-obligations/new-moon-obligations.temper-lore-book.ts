import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const newMoonObligations = {
  id: "01a0d60b-4e03-77f7-a894-2c2dfe4cf211",
  type: "page-type/temper-lore-book",
  slug: "new-moon-obligations",
  title: "New Moon Obligations",
  collection: "temper-lore-collection/pellitine-postings",
  esoBookId: 5850,
  bookIndex: 46,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
