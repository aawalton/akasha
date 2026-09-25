import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const nostrumsNotes = {
  id: "01a0d5f4-c388-74a5-93c9-c8828884338a",
  type: "page-type/temper-lore-book",
  slug: "nostrums-notes",
  title: "Nostrum's Notes",
  collection: "temper-lore-collection/plots-and-schemes",
  esoBookId: 710,
  bookIndex: 19,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
