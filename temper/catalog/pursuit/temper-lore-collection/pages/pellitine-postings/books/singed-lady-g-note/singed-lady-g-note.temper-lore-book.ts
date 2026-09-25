import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const singedLadyGNote = {
  id: "01a0d60b-4e03-7922-982b-43c07b056cee",
  type: "page-type/temper-lore-book",
  slug: "singed-lady-g-note",
  title: "Singed Lady G Note",
  collection: "temper-lore-collection/pellitine-postings",
  esoBookId: 5676,
  bookIndex: 15,
  charted: true,
  quest: 6408,
  positions: "jsonl",
} as const satisfies TemperLoreBook
