import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const anyonePlease = {
  id: "01a0d5f6-45ad-7662-9395-058dab907fcc",
  type: "page-type/temper-lore-book",
  slug: "anyone-please",
  title: "Anyone, Please",
  collection: "temper-lore-collection/final-words",
  esoBookId: 1602,
  bookIndex: 40,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
