import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToFaral = {
  id: "01a0d5f6-a29a-7dda-94a8-bcca8be218d6",
  type: "page-type/temper-lore-book",
  slug: "letter-to-faral",
  title: "Letter to Faral",
  collection: "temper-lore-collection/lore-of-murkmire",
  esoBookId: 5401,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
