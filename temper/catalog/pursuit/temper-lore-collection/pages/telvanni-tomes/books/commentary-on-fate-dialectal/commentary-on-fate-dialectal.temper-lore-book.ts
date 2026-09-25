import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const commentaryOnFateDialectal = {
  id: "01a0d60c-eb9b-7bd5-b800-261b42f6f139",
  type: "page-type/temper-lore-book",
  slug: "commentary-on-fate-dialectal",
  title: "Commentary on Fate Dialectal",
  collection: "temper-lore-collection/telvanni-tomes",
  esoBookId: 7621,
  bookIndex: 77,
  charted: true,
  quest: 7020,
  positions: "jsonl",
} as const satisfies TemperLoreBook
