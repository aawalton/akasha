import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterFromLadyArabelle = {
  id: "01a0d60c-18bd-7d6b-8bfd-9ec2559ded72",
  type: "page-type/temper-lore-book",
  slug: "letter-from-lady-arabelle",
  title: "Letter from Lady Arabelle",
  collection: "temper-lore-collection/the-impresarios-catalogue",
  esoBookId: 7138,
  bookIndex: 5,
  charted: true,
  quest: 6751,
  positions: "jsonl",
} as const satisfies TemperLoreBook
