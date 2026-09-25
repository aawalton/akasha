import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const targasNote = {
  id: "01a0d5f1-c91b-7263-9d7a-0c0035fd7123",
  type: "page-type/temper-lore-book",
  slug: "targas-note",
  title: "Targa's Note",
  collection: "temper-lore-collection/craglorn-secrets",
  esoBookId: 2567,
  bookIndex: 17,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
