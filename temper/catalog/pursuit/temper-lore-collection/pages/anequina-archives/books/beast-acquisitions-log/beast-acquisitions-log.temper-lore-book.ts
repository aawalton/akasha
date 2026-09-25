import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const beastAcquisitionsLog = {
  id: "01a0d60b-2344-7599-8cb4-83dd6977d52f",
  type: "page-type/temper-lore-book",
  slug: "beast-acquisitions-log",
  title: "Beast Acquisitions Log",
  collection: "temper-lore-collection/anequina-archives",
  esoBookId: 5419,
  charted: true,
  quest: 6301,
  positions: "jsonl",
} as const satisfies TemperLoreBook
