import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theHindQuartersRegistry = {
  id: "01a0d5f2-db27-7922-9a8c-48e59d574f85",
  type: "page-type/temper-lore-book",
  slug: "the-hind-quarters-registry",
  title: "The Hind-Quarters Registry",
  collection: "temper-lore-collection/houses-shops-and-trade",
  esoBookId: 1740,
  bookIndex: 60,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
