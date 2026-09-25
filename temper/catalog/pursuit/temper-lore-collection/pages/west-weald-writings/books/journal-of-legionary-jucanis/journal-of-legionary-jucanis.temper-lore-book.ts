import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const journalOfLegionaryJucanis = {
  id: "01a0d60d-4aaf-74b1-87b5-fa1638d1146e",
  type: "page-type/temper-lore-book",
  slug: "journal-of-legionary-jucanis",
  title: "Journal of Legionary Jucanis",
  collection: "temper-lore-collection/west-weald-writings",
  esoBookId: 7857,
  bookIndex: 72,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
