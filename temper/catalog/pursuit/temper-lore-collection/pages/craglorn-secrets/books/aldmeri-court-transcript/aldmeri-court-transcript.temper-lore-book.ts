import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aldmeriCourtTranscript = {
  id: "01a0d5f1-c919-7860-b116-b1e8a3d5aa40",
  type: "page-type/temper-lore-book",
  slug: "aldmeri-court-transcript",
  title: "Aldmeri Court Transcript",
  collection: "temper-lore-collection/craglorn-secrets",
  esoBookId: 2617,
  bookIndex: 44,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
