import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterFromVetitiaMarcott = {
  id: "01a0d60c-75b5-732b-9891-c6789d1e5590",
  type: "page-type/temper-lore-book",
  slug: "letter-from-vetitia-marcott",
  title: "Letter from Vetitia Marcott",
  collection: "temper-lore-collection/systres-tomes-and-scrolls",
  esoBookId: 7205,
  bookIndex: 88,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
