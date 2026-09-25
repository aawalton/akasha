import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const verriksNote = {
  id: "01a0d5f2-253c-7eac-8b4f-c605632167dd",
  type: "page-type/temper-lore-book",
  slug: "verriks-note",
  title: "Verrik's Note",
  collection: "temper-lore-collection/daedric-cults",
  esoBookId: 1096,
  bookIndex: 43,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
