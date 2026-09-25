import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const healerJenillesNote = {
  id: "01a0d60c-75b5-77fc-8685-9bad6e246f71",
  type: "page-type/temper-lore-book",
  slug: "healer-jenilles-note",
  title: "Healer Jenille's Note",
  collection: "temper-lore-collection/systres-tomes-and-scrolls",
  esoBookId: 7036,
  charted: true,
  quest: 6776,
  positions: "jsonl",
} as const satisfies TemperLoreBook
