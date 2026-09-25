import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToMertis = {
  id: "01a0d5f7-aa99-7b62-8182-a72ab376b088",
  type: "page-type/temper-lore-book",
  slug: "letter-to-mertis",
  title: "Letter to Mertis",
  collection: "temper-lore-collection/vvardenfell-volumes",
  esoBookId: 4045,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
