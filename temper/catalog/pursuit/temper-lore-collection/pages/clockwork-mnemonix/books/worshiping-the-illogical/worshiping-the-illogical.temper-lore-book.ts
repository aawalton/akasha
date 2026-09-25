import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const worshipingTheIllogical = {
  id: "01a0d60a-a214-765e-8ec1-d81219eb6d83",
  type: "page-type/temper-lore-book",
  slug: "worshiping-the-illogical",
  title: "Worshiping the Illogical",
  collection: "temper-lore-collection/clockwork-mnemonix",
  esoBookId: 4711,
  bookIndex: 65,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
