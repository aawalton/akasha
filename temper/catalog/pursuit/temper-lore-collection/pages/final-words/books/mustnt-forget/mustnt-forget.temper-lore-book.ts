import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const mustntForget = {
  id: "01a0d5f6-45ae-78ea-bbbb-3a5ff6cc656f",
  type: "page-type/temper-lore-book",
  slug: "mustnt-forget",
  title: "Mustn't Forget",
  collection: "temper-lore-collection/final-words",
  esoBookId: 536,
  bookIndex: 12,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
