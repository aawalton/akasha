import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const iMustNotFalter = {
  id: "01a0d5f2-253a-7f43-978e-d7dd121132a3",
  type: "page-type/temper-lore-book",
  slug: "i-must-not-falter",
  title: "I Must Not Falter",
  collection: "temper-lore-collection/daedric-cults",
  esoBookId: 1228,
  bookIndex: 48,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
