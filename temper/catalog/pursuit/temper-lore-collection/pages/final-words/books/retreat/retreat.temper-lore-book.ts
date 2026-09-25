import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const retreat = {
  id: "01a0d5f6-45ae-7b05-966f-ceea5efdae1b",
  type: "page-type/temper-lore-book",
  slug: "retreat",
  title: "Retreat!",
  collection: "temper-lore-collection/final-words",
  esoBookId: 1391,
  bookIndex: 33,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
