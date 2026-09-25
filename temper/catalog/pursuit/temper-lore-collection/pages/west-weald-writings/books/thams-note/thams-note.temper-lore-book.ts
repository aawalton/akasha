import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const thamsNote = {
  id: "01a0d60d-4ab0-71ae-bd92-29a5a8d42b1e",
  type: "page-type/temper-lore-book",
  slug: "thams-note",
  title: "Tham's Note",
  collection: "temper-lore-collection/west-weald-writings",
  esoBookId: 7855,
  bookIndex: 27,
  charted: true,
  quest: 7090,
  positions: "jsonl",
} as const satisfies TemperLoreBook
