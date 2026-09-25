import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const rulesOfNikolvarasKennel = {
  id: "01a0d5f6-d68b-78aa-831b-1422f05cdbe3",
  type: "page-type/temper-lore-book",
  slug: "rules-of-nikolvaras-kennel",
  title: "Rules of Nikolvara's Kennel",
  collection: "temper-lore-collection/wrothgar-writings",
  esoBookId: 2760,
  bookIndex: 20,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
