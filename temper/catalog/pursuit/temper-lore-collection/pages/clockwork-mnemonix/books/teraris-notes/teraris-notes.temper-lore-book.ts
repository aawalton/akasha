import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const terarisNotes = {
  id: "01a0d60a-a214-78a8-a4d8-0b26f00350f1",
  type: "page-type/temper-lore-book",
  slug: "teraris-notes",
  title: "Terari's Notes",
  collection: "temper-lore-collection/clockwork-mnemonix",
  esoBookId: 4573,
  bookIndex: 24,
  charted: true,
  quest: 6036,
  positions: "jsonl",
} as const satisfies TemperLoreBook
