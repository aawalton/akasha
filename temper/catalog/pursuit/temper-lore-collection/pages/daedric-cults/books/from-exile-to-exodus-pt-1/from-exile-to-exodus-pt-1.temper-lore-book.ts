import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const fromExileToExodusPt1 = {
  id: "01a0d5f2-253a-7a93-95b0-80ec2f7fb395",
  type: "page-type/temper-lore-book",
  slug: "from-exile-to-exodus-pt-1",
  title: "From Exile to Exodus, Pt. 1",
  collection: "temper-lore-collection/daedric-cults",
  esoBookId: 7817,
  charted: true,
  quest: 7079,
  positions: "jsonl",
} as const satisfies TemperLoreBook
