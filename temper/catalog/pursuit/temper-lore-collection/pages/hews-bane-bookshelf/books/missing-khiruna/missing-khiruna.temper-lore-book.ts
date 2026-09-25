import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const missingKhiruna = {
  id: "01a0d5f7-4294-70e8-9497-f1b22a298cd1",
  type: "page-type/temper-lore-book",
  slug: "missing-khiruna",
  title: "Missing: Khiruna",
  collection: "temper-lore-collection/hews-bane-bookshelf",
  esoBookId: 3438,
  bookIndex: 24,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
