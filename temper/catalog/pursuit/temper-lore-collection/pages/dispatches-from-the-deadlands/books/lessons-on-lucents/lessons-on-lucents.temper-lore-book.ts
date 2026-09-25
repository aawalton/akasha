import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const lessonsOnLucents = {
  id: "01a0d60c-40c0-76a3-99a6-61dc6c051425",
  type: "page-type/temper-lore-book",
  slug: "lessons-on-lucents",
  title: "Lessons on Lucents",
  collection: "temper-lore-collection/dispatches-from-the-deadlands",
  esoBookId: 6929,
  bookIndex: 52,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
