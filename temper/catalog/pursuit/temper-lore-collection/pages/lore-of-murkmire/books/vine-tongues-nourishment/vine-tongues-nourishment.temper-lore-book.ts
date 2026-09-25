import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const vineTonguesNourishment = {
  id: "01a0d5f6-a29b-7e13-8f8f-56e5687a0248",
  type: "page-type/temper-lore-book",
  slug: "vine-tongues-nourishment",
  title: "Vine-Tongues: Nourishment",
  collection: "temper-lore-collection/lore-of-murkmire",
  esoBookId: 5310,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
