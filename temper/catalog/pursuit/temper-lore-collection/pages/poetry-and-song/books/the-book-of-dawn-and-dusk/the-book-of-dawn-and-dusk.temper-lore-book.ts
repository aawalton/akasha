import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theBookOfDawnAndDusk = {
  id: "01a0d5e4-38b2-7983-bfd3-b1c12b7cc56e",
  type: "page-type/temper-lore-book",
  slug: "the-book-of-dawn-and-dusk",
  title: "The Book of Dawn and Dusk",
  collection: "temper-lore-collection/poetry-and-song",
  bookIndex: 2,
  shalidorPins: "jsonl",
} as const satisfies TemperLoreBook
