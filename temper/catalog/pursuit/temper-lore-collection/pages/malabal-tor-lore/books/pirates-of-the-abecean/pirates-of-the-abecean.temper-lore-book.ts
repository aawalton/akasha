import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const piratesOfTheAbecean = {
  id: "01a0d5e4-74e1-7632-9f45-8f7bdf654986",
  type: "page-type/temper-lore-book",
  slug: "pirates-of-the-abecean",
  title: "Pirates of the Abecean",
  collection: "temper-lore-collection/malabal-tor-lore",
  bookIndex: 6,
  shalidorPins: "jsonl",
} as const satisfies TemperLoreBook
