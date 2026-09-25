import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const heroesOfTheSanctuary = {
  id: "01a0d5f5-7766-7bec-8776-1f44c1b1e703",
  type: "page-type/temper-lore-book",
  slug: "heroes-of-the-sanctuary",
  title: "Heroes of the Sanctuary",
  collection: "temper-lore-collection/tales-of-tamriel",
  esoBookId: 1813,
  bookIndex: 81,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
