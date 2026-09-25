import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterFromDruidLaurel = {
  id: "01a0d60c-75b5-7854-85dd-3a40a8d61951",
  type: "page-type/temper-lore-book",
  slug: "letter-from-druid-laurel",
  title: "Letter from Druid Laurel",
  collection: "temper-lore-collection/systres-tomes-and-scrolls",
  esoBookId: 7282,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
