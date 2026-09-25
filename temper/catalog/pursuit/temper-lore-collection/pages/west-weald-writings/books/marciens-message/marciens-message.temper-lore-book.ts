import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const marciensMessage = {
  id: "01a0d60d-4aaf-7679-81a8-ff928f48c048",
  type: "page-type/temper-lore-book",
  slug: "marciens-message",
  title: "Marcien's Message",
  collection: "temper-lore-collection/west-weald-writings",
  esoBookId: 8065,
  charted: true,
  quest: 7210,
  positions: "jsonl",
} as const satisfies TemperLoreBook
