import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const merethrinsResearchNotes = {
  id: "01a0d5f5-1385-7bb8-819e-1c43109710d7",
  type: "page-type/temper-lore-book",
  slug: "merethrins-research-notes",
  title: "Merethrin's Research Notes",
  collection: "temper-lore-collection/research-notes",
  esoBookId: 1800,
  bookIndex: 75,
  charted: true,
  quest: 4844,
  positions: "jsonl",
  createdAt: "2026-09-25T00:26:43.461Z",
  updatedAt: "2026-09-25T00:26:45.000Z",
} as const satisfies TemperLoreBook
