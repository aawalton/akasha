import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToSeptimius = {
  id: "01a0d5f6-a29a-7d7d-b49d-d26e8f992ded",
  type: "page-type/temper-lore-book",
  slug: "letter-to-septimius",
  title: "Letter to Septimius",
  collection: "temper-lore-collection/lore-of-murkmire",
  esoBookId: 5381,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
