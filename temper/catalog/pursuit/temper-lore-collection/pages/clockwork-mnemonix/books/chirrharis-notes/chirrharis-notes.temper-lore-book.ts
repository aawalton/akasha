import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const chirrharisNotes = {
  id: "01a0d60a-a213-714b-af2a-9b28803bbe70",
  type: "page-type/temper-lore-book",
  slug: "chirrharis-notes",
  title: "Chirrhari's Notes",
  collection: "temper-lore-collection/clockwork-mnemonix",
  esoBookId: 4681,
  bookIndex: 46,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
