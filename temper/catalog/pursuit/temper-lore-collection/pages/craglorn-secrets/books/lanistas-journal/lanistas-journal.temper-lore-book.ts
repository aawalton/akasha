import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const lanistasJournal = {
  id: "01a0d5f1-c91a-7024-81a1-76d51f512265",
  type: "page-type/temper-lore-book",
  slug: "lanistas-journal",
  title: "Lanista's Journal",
  collection: "temper-lore-collection/craglorn-secrets",
  esoBookId: 2650,
  bookIndex: 52,
  charted: true,
  positions: "jsonl",
  createdAt: "2026-09-25T00:23:07.802Z",
  updatedAt: "2026-09-25T00:23:09.000Z",
} as const satisfies TemperLoreBook
