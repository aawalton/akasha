import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const conversionStatus = {
  id: "01a0d5f6-d68a-75bb-a0c7-7f4abeefbf03",
  type: "page-type/temper-lore-book",
  slug: "conversion-status",
  title: "Conversion Status",
  collection: "temper-lore-collection/wrothgar-writings",
  esoBookId: 3062,
  bookIndex: 91,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
