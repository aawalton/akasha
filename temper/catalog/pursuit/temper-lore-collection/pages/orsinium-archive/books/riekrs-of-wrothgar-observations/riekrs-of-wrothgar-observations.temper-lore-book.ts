import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const riekrsOfWrothgarObservations = {
  id: "01a0d5f7-160b-732f-b203-b3e6826d16ff",
  type: "page-type/temper-lore-book",
  slug: "riekrs-of-wrothgar-observations",
  title: "Riekrs of Wrothgar: Observations",
  collection: "temper-lore-collection/orsinium-archive",
  esoBookId: 2712,
  bookIndex: 6,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
