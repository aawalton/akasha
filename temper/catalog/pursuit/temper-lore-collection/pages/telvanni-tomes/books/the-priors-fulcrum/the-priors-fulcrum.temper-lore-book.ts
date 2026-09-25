import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const thePriorsFulcrum = {
  id: "01a0d60c-eb9c-75bb-abb3-61a46c1537a6",
  type: "page-type/temper-lore-book",
  slug: "the-priors-fulcrum",
  title: "The Prior's Fulcrum",
  collection: "temper-lore-collection/telvanni-tomes",
  esoBookId: 7695,
  bookIndex: 1,
  charted: true,
  quest: 6971,
  positions: "jsonl",
} as const satisfies TemperLoreBook
