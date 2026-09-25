import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const teebaHatsei = {
  id: "01a0d5f6-a29a-7a00-b727-8215d7e942b3",
  type: "page-type/temper-lore-book",
  slug: "teeba-hatsei",
  title: "Teeba-Hatsei",
  collection: "temper-lore-collection/lore-of-murkmire",
  esoBookId: 2813,
  bookIndex: 14,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
