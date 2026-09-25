import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const thunderbugRepellent = {
  id: "01a0d5f4-3c13-7ce8-8f2e-d115ed783a6f",
  type: "page-type/temper-lore-book",
  slug: "thunderbug-repellent",
  title: "Thunderbug Repellent",
  collection: "temper-lore-collection/notes-and-memos",
  esoBookId: 2046,
  bookIndex: 81,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
