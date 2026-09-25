import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const naanurrelsLogbook = {
  id: "01a0d60d-156e-7e5c-9137-dfddefe51fb6",
  type: "page-type/temper-lore-book",
  slug: "naanurrels-logbook",
  title: "Naanurrel's Logbook",
  collection: "temper-lore-collection/apocryphal-pages",
  esoBookId: 7607,
  bookIndex: 42,
  charted: true,
  quest: 6982,
  positions: "jsonl",
} as const satisfies TemperLoreBook
