import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aPocketGuideToMournhold = {
  id: "01a0d5e4-9c9a-7ce2-ad6c-db45a457079e",
  type: "page-type/temper-lore-book",
  slug: "a-pocket-guide-to-mournhold",
  title: "A Pocket Guide to Mournhold",
  collection: "temper-lore-collection/deshaan-lore",
  bookIndex: 8,
  shalidorPins: "jsonl",
} as const satisfies TemperLoreBook
