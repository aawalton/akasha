import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const steadyHands = {
  id: "01a0d60a-a214-7335-8832-7bcc0f10fc8b",
  type: "page-type/temper-lore-book",
  slug: "steady-hands",
  title: "Steady Hands",
  collection: "temper-lore-collection/clockwork-mnemonix",
  esoBookId: 4584,
  bookIndex: 9,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
