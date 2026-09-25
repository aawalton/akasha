import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const allBowToMirrormoor = {
  id: "01a0d60d-9a63-7942-961e-338f5efaad38",
  type: "page-type/temper-lore-book",
  slug: "all-bow-to-mirrormoor",
  title: "All Bow to Mirrormoor!",
  collection: "temper-lore-collection/scholarium-scribblings",
  esoBookId: 8193,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
