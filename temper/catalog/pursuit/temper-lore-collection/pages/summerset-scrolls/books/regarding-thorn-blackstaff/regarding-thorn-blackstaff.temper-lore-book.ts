import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const regardingThornBlackstaff = {
  id: "01a0d60a-d5bd-710a-abb0-6a56cbe2fd9d",
  type: "page-type/temper-lore-book",
  slug: "regarding-thorn-blackstaff",
  title: "Regarding Thorn Blackstaff",
  collection: "temper-lore-collection/summerset-scrolls",
  esoBookId: 5084,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
