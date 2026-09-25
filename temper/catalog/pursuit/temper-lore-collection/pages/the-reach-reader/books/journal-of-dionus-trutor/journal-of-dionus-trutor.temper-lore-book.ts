import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const journalOfDionusTrutor = {
  id: "01a0d60b-c958-7a8e-991b-b36f2adc5f81",
  type: "page-type/temper-lore-book",
  slug: "journal-of-dionus-trutor",
  title: "Journal of Dionus Trutor",
  collection: "temper-lore-collection/the-reach-reader",
  esoBookId: 6254,
  bookIndex: 27,
  charted: true,
  quest: 6566,
  positions: "jsonl",
} as const satisfies TemperLoreBook
