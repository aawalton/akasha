import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const miregauntsOfTheMarsh = {
  id: "01a0d5f6-a29a-72c0-b2c4-f59732ffe4dd",
  type: "page-type/temper-lore-book",
  slug: "miregaunts-of-the-marsh",
  title: "Miregaunts of the Marsh",
  collection: "temper-lore-collection/lore-of-murkmire",
  esoBookId: 5305,
  bookIndex: 62,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
