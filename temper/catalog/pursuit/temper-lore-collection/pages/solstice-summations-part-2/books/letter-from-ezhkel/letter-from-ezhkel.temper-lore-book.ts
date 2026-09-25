import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterFromEzhkel = {
  id: "01a0d60e-45b2-7a24-b83d-f222052e670f",
  type: "page-type/temper-lore-book",
  slug: "letter-from-ezhkel",
  title: "Letter from Ezhkel",
  collection: "temper-lore-collection/solstice-summations-part-2",
  esoBookId: 8586,
  bookIndex: 31,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
