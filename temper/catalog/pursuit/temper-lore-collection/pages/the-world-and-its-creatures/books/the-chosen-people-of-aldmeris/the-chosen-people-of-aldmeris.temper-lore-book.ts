import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theChosenPeopleOfAldmeris = {
  id: "01a0d5f5-f3e4-758c-b18b-e508b8d66335",
  type: "page-type/temper-lore-book",
  slug: "the-chosen-people-of-aldmeris",
  title: "The Chosen People of Aldmeris",
  collection: "temper-lore-collection/the-world-and-its-creatures",
  esoBookId: 540,
  bookIndex: 7,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
