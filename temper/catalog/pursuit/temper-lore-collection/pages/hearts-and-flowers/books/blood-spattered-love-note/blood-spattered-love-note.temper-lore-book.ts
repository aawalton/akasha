import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const bloodSpatteredLoveNote = {
  id: "01a0d5f2-af6f-7d87-9d7e-fb667838013e",
  type: "page-type/temper-lore-book",
  slug: "blood-spattered-love-note",
  title: "Blood-Spattered Love Note",
  collection: "temper-lore-collection/hearts-and-flowers",
  esoBookId: 1909,
  bookIndex: 51,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
