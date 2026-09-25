import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const pillagersOfTheHist = {
  id: "01a0d5f4-3c12-736d-bd36-5439fe62f2a2",
  type: "page-type/temper-lore-book",
  slug: "pillagers-of-the-hist",
  title: "Pillagers of the Hist",
  collection: "temper-lore-collection/notes-and-memos",
  esoBookId: 674,
  bookIndex: 13,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
