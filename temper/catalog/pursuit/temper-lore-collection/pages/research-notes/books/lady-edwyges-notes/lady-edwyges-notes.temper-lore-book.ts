import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const ladyEdwygesNotes = {
  id: "01a0d5f5-1385-70a5-ae71-fd1fe681e9e4",
  type: "page-type/temper-lore-book",
  slug: "lady-edwyges-notes",
  title: "Lady Edwyge's Notes",
  collection: "temper-lore-collection/research-notes",
  esoBookId: 113,
  bookIndex: 2,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
