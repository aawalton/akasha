import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const eyesOfNothing = {
  id: "01a0d60a-a213-7332-8f8e-a1d884201117",
  type: "page-type/temper-lore-book",
  slug: "eyes-of-nothing",
  title: "Eyes of Nothing",
  collection: "temper-lore-collection/clockwork-mnemonix",
  esoBookId: 4702,
  bookIndex: 21,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
