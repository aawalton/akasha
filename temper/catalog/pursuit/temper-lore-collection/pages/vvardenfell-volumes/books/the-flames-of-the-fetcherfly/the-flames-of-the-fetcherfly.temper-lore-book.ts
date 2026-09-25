import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theFlamesOfTheFetcherfly = {
  id: "01a0d5f7-aa99-77e2-b121-831c52b63e92",
  type: "page-type/temper-lore-book",
  slug: "the-flames-of-the-fetcherfly",
  title: "The Flames of the Fetcherfly",
  collection: "temper-lore-collection/vvardenfell-volumes",
  esoBookId: 4549,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
