import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aLegionarysHistoryOfFortRedmane = {
  id: "01a0d60b-fdaf-7071-a875-fd3644bb869f",
  type: "page-type/temper-lore-book",
  slug: "a-legionarys-history-of-fort-redmane",
  title: "A Legionary's History of Fort Redmane",
  collection: "temper-lore-collection/books-of-blackwood",
  esoBookId: 6744,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
