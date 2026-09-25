import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const caterwaulLogbook = {
  id: "01a0d60e-45b2-7c37-8986-40d7cdb119ba",
  type: "page-type/temper-lore-book",
  slug: "caterwaul-logbook",
  title: "Caterwaul Logbook",
  collection: "temper-lore-collection/solstice-summations-part-2",
  esoBookId: 8572,
  bookIndex: 29,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
