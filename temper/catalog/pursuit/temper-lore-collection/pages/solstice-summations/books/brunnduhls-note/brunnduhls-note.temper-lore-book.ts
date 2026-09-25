import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const brunnduhlsNote = {
  id: "01a0d60d-ff69-7701-81ce-da2f58f60ce0",
  type: "page-type/temper-lore-book",
  slug: "brunnduhls-note",
  title: "Brunnduhl's Note",
  collection: "temper-lore-collection/solstice-summations",
  esoBookId: 8318,
  bookIndex: 15,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
