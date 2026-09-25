import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const workForHireInLeyawiin = {
  id: "01a0d60b-fdb1-709c-95ac-a41e1e6e50fc",
  type: "page-type/temper-lore-book",
  slug: "work-for-hire-in-leyawiin",
  title: "Work for Hire in Leyawiin",
  collection: "temper-lore-collection/books-of-blackwood",
  esoBookId: 6519,
  bookIndex: 68,
  charted: true,
  quest: 6643,
  positions: "jsonl",
} as const satisfies TemperLoreBook
