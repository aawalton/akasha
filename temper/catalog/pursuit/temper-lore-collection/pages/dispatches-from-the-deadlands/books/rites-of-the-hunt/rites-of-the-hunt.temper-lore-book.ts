import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const ritesOfTheHunt = {
  id: "01a0d60c-40c0-766b-bd12-e8cda7ae00f7",
  type: "page-type/temper-lore-book",
  slug: "rites-of-the-hunt",
  title: "Rites of the Hunt",
  collection: "temper-lore-collection/dispatches-from-the-deadlands",
  esoBookId: 6773,
  bookIndex: 75,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
