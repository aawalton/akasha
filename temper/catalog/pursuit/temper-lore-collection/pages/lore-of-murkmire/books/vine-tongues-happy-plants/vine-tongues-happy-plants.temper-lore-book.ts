import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const vineTonguesHappyPlants = {
  id: "01a0d5f6-a29b-7974-8a4a-4aae3fbea83e",
  type: "page-type/temper-lore-book",
  slug: "vine-tongues-happy-plants",
  title: "Vine-Tongues: Happy Plants",
  collection: "temper-lore-collection/lore-of-murkmire",
  esoBookId: 5309,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
