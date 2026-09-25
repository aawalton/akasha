import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theMysteryOfFactotums = {
  id: "01a0d60a-a214-7af6-be96-ffe6173b3828",
  type: "page-type/temper-lore-book",
  slug: "the-mystery-of-factotums",
  title: "The Mystery of Factotums",
  collection: "temper-lore-collection/clockwork-mnemonix",
  esoBookId: 4691,
  bookIndex: 17,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
