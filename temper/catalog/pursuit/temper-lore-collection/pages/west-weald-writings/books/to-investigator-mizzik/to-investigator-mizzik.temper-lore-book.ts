import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const toInvestigatorMizzik = {
  id: "01a0d60d-4ab0-7635-9596-c7dc34ee9a21",
  type: "page-type/temper-lore-book",
  slug: "to-investigator-mizzik",
  title: "To Investigator Mizzik",
  collection: "temper-lore-collection/west-weald-writings",
  esoBookId: 7840,
  bookIndex: 70,
  charted: true,
  quest: 7082,
  positions: "jsonl",
} as const satisfies TemperLoreBook
