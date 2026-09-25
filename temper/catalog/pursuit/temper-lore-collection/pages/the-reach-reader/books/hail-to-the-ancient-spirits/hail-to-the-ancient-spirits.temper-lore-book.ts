import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const hailToTheAncientSpirits = {
  id: "01a0d60b-c958-7515-8beb-4756272ee830",
  type: "page-type/temper-lore-book",
  slug: "hail-to-the-ancient-spirits",
  title: "Hail to the Ancient Spirits",
  collection: "temper-lore-collection/the-reach-reader",
  esoBookId: 6363,
  bookIndex: 4,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
