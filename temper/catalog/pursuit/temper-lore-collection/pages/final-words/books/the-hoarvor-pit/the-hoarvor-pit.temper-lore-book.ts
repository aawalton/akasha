import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theHoarvorPit = {
  id: "01a0d5f6-45ae-7b66-b2be-6fcf89b1747f",
  type: "page-type/temper-lore-book",
  slug: "the-hoarvor-pit",
  title: "The Hoarvor Pit",
  collection: "temper-lore-collection/final-words",
  esoBookId: 614,
  bookIndex: 15,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
