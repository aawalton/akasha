import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const delsClaim = {
  id: "01a0d5f4-c383-71ed-b932-10fb07b7ebc1",
  type: "page-type/temper-lore-book",
  slug: "dels-claim",
  title: "Del's Claim",
  collection: "temper-lore-collection/plots-and-schemes",
  esoBookId: 708,
  bookIndex: 18,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
