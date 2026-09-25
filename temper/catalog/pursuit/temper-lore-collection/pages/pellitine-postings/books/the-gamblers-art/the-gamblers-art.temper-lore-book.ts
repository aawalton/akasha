import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theGamblersArt = {
  id: "01a0d60b-4e03-7720-8055-a8a152b6beab",
  type: "page-type/temper-lore-book",
  slug: "the-gamblers-art",
  title: "The Gambler's Art",
  collection: "temper-lore-collection/pellitine-postings",
  esoBookId: 5812,
  bookIndex: 37,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
