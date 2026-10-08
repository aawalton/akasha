import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToIrm = {
  id: "01a0d60b-a361-74bd-9de6-b48f3bb6615d",
  type: "page-type/temper-lore-book",
  slug: "letter-to-irm",
  title: "Letter to Irm",
  collection: "temper-lore-collection/western-skyrim-register",
  esoBookId: 6113,
  bookIndex: 24,
  charted: true,
  quest: 6534,
  positions: "jsonl",
  createdAt: "2026-09-25T00:51:22.081Z",
  updatedAt: "2026-09-25T00:51:23.000Z",
} as const satisfies TemperLoreBook
