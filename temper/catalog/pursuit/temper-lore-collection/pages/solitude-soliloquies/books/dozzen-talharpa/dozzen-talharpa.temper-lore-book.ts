import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const dozzenTalharpa = {
  id: "01a0d60b-8107-7f24-b340-df14a41b4414",
  type: "page-type/temper-lore-book",
  slug: "dozzen-talharpa",
  title: "Dozzen Talharpa",
  collection: "temper-lore-collection/solitude-soliloquies",
  esoBookId: 6107,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
