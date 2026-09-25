import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const telofasasDiary = {
  id: "01a0d60c-40c0-766b-9ecd-faa1520ad74c",
  type: "page-type/temper-lore-book",
  slug: "telofasas-diary",
  title: "Telofasa's Diary",
  collection: "temper-lore-collection/dispatches-from-the-deadlands",
  esoBookId: 6843,
  bookIndex: 26,
  charted: true,
  quest: 6730,
  positions: "jsonl",
} as const satisfies TemperLoreBook
