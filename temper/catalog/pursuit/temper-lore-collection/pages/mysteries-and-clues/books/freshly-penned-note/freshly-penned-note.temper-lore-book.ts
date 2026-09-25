import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const freshlyPennedNote = {
  id: "01a0d5f4-07b7-7a76-99f6-31ff15099fab",
  type: "page-type/temper-lore-book",
  slug: "freshly-penned-note",
  title: "Freshly Penned Note",
  collection: "temper-lore-collection/mysteries-and-clues",
  esoBookId: 4419,
  bookIndex: 78,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
