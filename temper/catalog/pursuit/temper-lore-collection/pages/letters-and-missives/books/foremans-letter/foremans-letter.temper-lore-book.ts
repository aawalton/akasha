import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const foremansLetter = {
  id: "01a0d5f3-0ef7-777d-a2e1-24a0ba64c0e8",
  type: "page-type/temper-lore-book",
  slug: "foremans-letter",
  title: "Foreman's Letter",
  collection: "temper-lore-collection/letters-and-missives",
  esoBookId: 1208,
  bookIndex: 39,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
