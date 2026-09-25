import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theSwallowedCity = {
  id: "01a0d5f5-444d-7943-b565-6d6f02fd6ac0",
  type: "page-type/temper-lore-book",
  slug: "the-swallowed-city",
  title: "The Swallowed City",
  collection: "temper-lore-collection/rituals-and-revelations",
  esoBookId: 1823,
  bookIndex: 67,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
