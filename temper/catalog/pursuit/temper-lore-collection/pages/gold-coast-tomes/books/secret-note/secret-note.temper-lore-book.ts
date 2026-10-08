import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const secretNote = {
  id: "01a0d5f7-73fa-74ce-8233-96b183dfa810",
  type: "page-type/temper-lore-book",
  slug: "secret-note",
  title: "Secret Note",
  collection: "temper-lore-collection/gold-coast-tomes",
  esoBookId: 3667,
  bookIndex: 36,
  charted: true,
  quest: 5664,
  positions: "jsonl",
  createdAt: "2026-09-25T00:29:19.226Z",
  updatedAt: "2026-09-25T00:29:21.000Z",
} as const satisfies TemperLoreBook
