import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const auridonTargetBrief = {
  id: "01a0d60d-bbe4-72e3-acc9-e6f1422e4a65",
  type: "page-type/temper-lore-book",
  slug: "auridon-target-brief",
  title: "Auridon Target Brief",
  collection: "temper-lore-collection/companions-correspondence",
  esoBookId: 8158,
  bookIndex: 9,
  charted: true,
  quest: 7186,
  positions: "jsonl",
} as const satisfies TemperLoreBook
