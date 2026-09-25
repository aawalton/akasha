import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const testamentOfDanderaHelas = {
  id: "01a0d5f2-253b-7ea8-838e-db197df4105a",
  type: "page-type/temper-lore-book",
  slug: "testament-of-dandera-helas",
  title: "Testament of Dandera Helas",
  collection: "temper-lore-collection/daedric-cults",
  esoBookId: 7826,
  charted: true,
  quest: 7079,
  positions: "jsonl",
} as const satisfies TemperLoreBook
