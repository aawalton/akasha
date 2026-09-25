import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aHistoryOfMorKhazgur = {
  id: "01a0d60b-a361-7ce9-8acc-cfa8ebcce01c",
  type: "page-type/temper-lore-book",
  slug: "a-history-of-mor-khazgur",
  title: "A History of Mor Khazgur",
  collection: "temper-lore-collection/western-skyrim-register",
  esoBookId: 6246,
  bookIndex: 38,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
