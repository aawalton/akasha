import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const ourDunmerHeritage = {
  id: "01a0d60c-eb9c-7ef1-9e29-e26148424263",
  type: "page-type/temper-lore-book",
  slug: "our-dunmer-heritage",
  title: "Our Dunmer Heritage",
  collection: "temper-lore-collection/telvanni-tomes",
  esoBookId: 7464,
  bookIndex: 49,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
