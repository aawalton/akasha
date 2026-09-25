import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const factotumModelRegistry = {
  id: "01a0d60a-a213-7084-84d8-338733485474",
  type: "page-type/temper-lore-book",
  slug: "factotum-model-registry",
  title: "Factotum Model Registry",
  collection: "temper-lore-collection/clockwork-mnemonix",
  esoBookId: 4586,
  bookIndex: 31,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
