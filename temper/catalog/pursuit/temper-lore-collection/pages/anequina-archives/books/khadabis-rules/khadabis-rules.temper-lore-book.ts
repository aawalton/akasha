import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const khadabisRules = {
  id: "01a0d60b-2345-79a1-be5b-070243db668e",
  type: "page-type/temper-lore-book",
  slug: "khadabis-rules",
  title: "Khadabi's Rules",
  collection: "temper-lore-collection/anequina-archives",
  esoBookId: 5636,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
