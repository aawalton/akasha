import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const fromExileToExodusPt2 = {
  id: "01a0d5f2-253a-7243-8cc4-8ce5cc61e535",
  type: "page-type/temper-lore-book",
  slug: "from-exile-to-exodus-pt-2",
  title: "From Exile to Exodus, Pt. 2",
  collection: "temper-lore-collection/daedric-cults",
  esoBookId: 7818,
  charted: true,
  quest: 7079,
  positions: "jsonl",
} as const satisfies TemperLoreBook
