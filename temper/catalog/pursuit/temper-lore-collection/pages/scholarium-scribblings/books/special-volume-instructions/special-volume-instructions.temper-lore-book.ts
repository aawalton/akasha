import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const specialVolumeInstructions = {
  id: "01a0d60d-9a64-7248-8201-8e0632e1035b",
  type: "page-type/temper-lore-book",
  slug: "special-volume-instructions",
  title: "Special Volume Instructions",
  collection: "temper-lore-collection/scholarium-scribblings",
  esoBookId: 8088,
  bookIndex: 63,
  charted: true,
  quest: 7217,
  positions: "jsonl",
} as const satisfies TemperLoreBook
