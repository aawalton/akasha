import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const alteredNaanurrelsLogbook = {
  id: "01a0d60d-156d-7cee-b81b-efe162e4150e",
  type: "page-type/temper-lore-book",
  slug: "altered-naanurrels-logbook",
  title: "Altered Naanurrel's Logbook",
  collection: "temper-lore-collection/apocryphal-pages",
  esoBookId: 7645,
  bookIndex: 50,
  charted: true,
  quest: 6982,
  positions: "jsonl",
} as const satisfies TemperLoreBook
