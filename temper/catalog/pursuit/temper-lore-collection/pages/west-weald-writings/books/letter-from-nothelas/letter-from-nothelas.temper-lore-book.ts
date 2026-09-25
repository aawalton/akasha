import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterFromNothelas = {
  id: "01a0d60d-4aaf-7bce-8ad1-31327fc4ebcd",
  type: "page-type/temper-lore-book",
  slug: "letter-from-nothelas",
  title: "Letter from Nothelas",
  collection: "temper-lore-collection/west-weald-writings",
  esoBookId: 7778,
  bookIndex: 1,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
