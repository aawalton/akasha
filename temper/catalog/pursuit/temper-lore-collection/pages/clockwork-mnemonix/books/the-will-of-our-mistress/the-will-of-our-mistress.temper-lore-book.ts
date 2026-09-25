import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theWillOfOurMistress = {
  id: "01a0d60a-a214-7b11-a6eb-3260a884177e",
  type: "page-type/temper-lore-book",
  slug: "the-will-of-our-mistress",
  title: "The Will of Our Mistress",
  collection: "temper-lore-collection/clockwork-mnemonix",
  esoBookId: 4683,
  bookIndex: 47,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
