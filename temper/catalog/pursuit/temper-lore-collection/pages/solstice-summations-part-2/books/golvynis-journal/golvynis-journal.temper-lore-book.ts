import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const golvynisJournal = {
  id: "01a0d60e-45b2-7775-8f27-d41e5e3024f2",
  type: "page-type/temper-lore-book",
  slug: "golvynis-journal",
  title: "Golvyni's Journal",
  collection: "temper-lore-collection/solstice-summations-part-2",
  esoBookId: 8122,
  bookIndex: 11,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
