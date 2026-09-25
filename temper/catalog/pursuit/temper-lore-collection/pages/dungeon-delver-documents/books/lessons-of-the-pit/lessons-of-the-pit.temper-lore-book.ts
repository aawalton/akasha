import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const lessonsOfThePit = {
  id: "01a0d60d-708e-7f8b-860a-3308aa5b0731",
  type: "page-type/temper-lore-book",
  slug: "lessons-of-the-pit",
  title: "Lessons of the Pit",
  collection: "temper-lore-collection/dungeon-delver-documents",
  esoBookId: 7810,
  bookIndex: 18,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
