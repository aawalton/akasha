import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const minwilethsDiary = {
  id: "01a0d60c-40c0-743e-8b9b-721db7bb6fcd",
  type: "page-type/temper-lore-book",
  slug: "minwileths-diary",
  title: "Minwileth's Diary",
  collection: "temper-lore-collection/dispatches-from-the-deadlands",
  esoBookId: 6590,
  bookIndex: 61,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
