import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const raynorsBthanualNotes = {
  id: "01a0d5f5-1385-783d-889f-ca4806a2ae0d",
  type: "page-type/temper-lore-book",
  slug: "raynors-bthanual-notes",
  title: "Raynor's Bthanual Notes",
  collection: "temper-lore-collection/research-notes",
  esoBookId: 1055,
  bookIndex: 44,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
