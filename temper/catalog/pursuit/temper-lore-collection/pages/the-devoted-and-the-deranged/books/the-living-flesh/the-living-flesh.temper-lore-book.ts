import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theLivingFlesh = {
  id: "01a0d5f5-abbb-7121-93f5-833cca143639",
  type: "page-type/temper-lore-book",
  slug: "the-living-flesh",
  title: "The Living Flesh",
  collection: "temper-lore-collection/the-devoted-and-the-deranged",
  esoBookId: 1897,
  bookIndex: 59,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
