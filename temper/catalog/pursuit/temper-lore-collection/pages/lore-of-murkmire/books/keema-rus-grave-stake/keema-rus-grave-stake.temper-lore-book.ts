import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const keemaRusGraveStake = {
  id: "01a0d5f6-a299-76b6-b9a3-c730c581c24d",
  type: "page-type/temper-lore-book",
  slug: "keema-rus-grave-stake",
  title: "Keema-Ru's Grave-Stake",
  collection: "temper-lore-collection/lore-of-murkmire",
  esoBookId: 5277,
  charted: true,
  quest: 6277,
  positions: "jsonl",
} as const satisfies TemperLoreBook
