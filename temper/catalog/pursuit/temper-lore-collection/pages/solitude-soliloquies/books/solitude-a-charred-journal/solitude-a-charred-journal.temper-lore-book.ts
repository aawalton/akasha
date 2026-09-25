import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const solitudeACharredJournal = {
  id: "01a0d60b-8109-70c4-ab04-1e0b6cd3d9bf",
  type: "page-type/temper-lore-book",
  slug: "solitude-a-charred-journal",
  title: "Solitude: A Charred Journal",
  collection: "temper-lore-collection/solitude-soliloquies",
  esoBookId: 6054,
  bookIndex: 45,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
