import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const simpleIllusionMagic = {
  id: "01a0d5f5-444c-71e2-a144-a7e592650954",
  type: "page-type/temper-lore-book",
  slug: "simple-illusion-magic",
  title: "Simple Illusion Magic",
  collection: "temper-lore-collection/rituals-and-revelations",
  esoBookId: 1458,
  bookIndex: 55,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
