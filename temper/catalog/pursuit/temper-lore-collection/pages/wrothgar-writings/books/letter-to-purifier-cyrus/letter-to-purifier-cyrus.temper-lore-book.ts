import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToPurifierCyrus = {
  id: "01a0d5f6-d68b-739f-99bb-cab9f9a3e52c",
  type: "page-type/temper-lore-book",
  slug: "letter-to-purifier-cyrus",
  title: "Letter to Purifier Cyrus",
  collection: "temper-lore-collection/wrothgar-writings",
  esoBookId: 2704,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
