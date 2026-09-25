import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const corruptionOfTheBlood = {
  id: "01a0d60a-d5bc-79ee-9a86-2f47c617666a",
  type: "page-type/temper-lore-book",
  slug: "corruption-of-the-blood",
  title: "Corruption of the Blood",
  collection: "temper-lore-collection/summerset-scrolls",
  esoBookId: 5119,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
