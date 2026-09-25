import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const pathOfTheIronclad = {
  id: "01a0d60c-40c0-7ff6-abba-3e78b5a8c593",
  type: "page-type/temper-lore-book",
  slug: "path-of-the-ironclad",
  title: "Path of the Ironclad",
  collection: "temper-lore-collection/dispatches-from-the-deadlands",
  esoBookId: 6511,
  bookIndex: 31,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
