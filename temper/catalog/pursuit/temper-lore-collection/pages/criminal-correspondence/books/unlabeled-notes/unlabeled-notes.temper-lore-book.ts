import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const unlabeledNotes = {
  id: "01a0d5f1-f452-73b9-8ab5-153d456f3805",
  type: "page-type/temper-lore-book",
  slug: "unlabeled-notes",
  title: "Unlabeled Notes",
  collection: "temper-lore-collection/criminal-correspondence",
  esoBookId: 1741,
  bookIndex: 65,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
