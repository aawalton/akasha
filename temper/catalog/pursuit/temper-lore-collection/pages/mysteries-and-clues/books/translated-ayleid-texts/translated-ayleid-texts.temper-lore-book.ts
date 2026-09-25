import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const translatedAyleidTexts = {
  id: "01a0d5f4-07b9-7fcb-87ed-598b693fa43e",
  type: "page-type/temper-lore-book",
  slug: "translated-ayleid-texts",
  title: "Translated Ayleid Texts",
  collection: "temper-lore-collection/mysteries-and-clues",
  esoBookId: 2070,
  bookIndex: 55,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
