import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const minersWarning = {
  id: "01a0d5f7-aa99-7876-affe-1a487848890e",
  type: "page-type/temper-lore-book",
  slug: "miners-warning",
  title: "Miner's Warning",
  collection: "temper-lore-collection/vvardenfell-volumes",
  esoBookId: 4443,
  bookIndex: 85,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
