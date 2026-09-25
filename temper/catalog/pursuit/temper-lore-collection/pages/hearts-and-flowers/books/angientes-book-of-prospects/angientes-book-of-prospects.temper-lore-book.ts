import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const angientesBookOfProspects = {
  id: "01a0d5f2-af6f-71eb-ac9f-21a9b02b79a9",
  type: "page-type/temper-lore-book",
  slug: "angientes-book-of-prospects",
  title: "Angiente's Book of Prospects",
  collection: "temper-lore-collection/hearts-and-flowers",
  esoBookId: 2260,
  bookIndex: 68,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
