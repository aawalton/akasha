import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const malizazsJournal = {
  id: "01a0d60b-2345-70c5-85e4-ec634faeb006",
  type: "page-type/temper-lore-book",
  slug: "malizazs-journal",
  title: "Malizaz's Journal",
  collection: "temper-lore-collection/anequina-archives",
  esoBookId: 5425,
  bookIndex: 84,
  charted: true,
  quest: 6321,
  positions: "jsonl",
  createdAt: "2026-09-25T00:50:49.285Z",
  updatedAt: "2026-09-25T00:50:51.000Z",
} as const satisfies TemperLoreBook
