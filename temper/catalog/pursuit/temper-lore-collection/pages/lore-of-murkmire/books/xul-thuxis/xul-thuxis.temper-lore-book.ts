import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const xulThuxis = {
  id: "01a0d5f6-a29b-7a15-a8eb-869add5b5b88",
  type: "page-type/temper-lore-book",
  slug: "xul-thuxis",
  title: "Xul-Thuxis",
  collection: "temper-lore-collection/lore-of-murkmire",
  esoBookId: 5377,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
