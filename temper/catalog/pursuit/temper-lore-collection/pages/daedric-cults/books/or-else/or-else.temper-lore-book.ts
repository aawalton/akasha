import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const orElse = {
  id: "01a0d5f2-253b-7a99-a46f-29d9a673d5ed",
  type: "page-type/temper-lore-book",
  slug: "or-else",
  title: "Or Else",
  collection: "temper-lore-collection/daedric-cults",
  esoBookId: 538,
  bookIndex: 15,
  charted: true,
  quest: 4135,
  positions: "jsonl",
} as const satisfies TemperLoreBook
