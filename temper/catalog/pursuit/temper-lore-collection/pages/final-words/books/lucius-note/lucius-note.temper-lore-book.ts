import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const luciusNote = {
  id: "01a0d5f6-45ae-770b-8676-91132a229e82",
  type: "page-type/temper-lore-book",
  slug: "lucius-note",
  title: "Lucius' Note",
  collection: "temper-lore-collection/final-words",
  esoBookId: 509,
  bookIndex: 11,
  charted: true,
  quest: 4238,
  positions: "jsonl",
} as const satisfies TemperLoreBook
