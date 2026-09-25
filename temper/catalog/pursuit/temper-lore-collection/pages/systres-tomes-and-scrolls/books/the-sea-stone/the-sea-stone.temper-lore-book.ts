import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theSeaStone = {
  id: "01a0d60c-75b6-76be-aff9-560638e1cd1f",
  type: "page-type/temper-lore-book",
  slug: "the-sea-stone",
  title: "The Sea Stone",
  collection: "temper-lore-collection/systres-tomes-and-scrolls",
  esoBookId: 7180,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
