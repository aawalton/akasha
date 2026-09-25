import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const journalOfShardmarshalVargas = {
  id: "01a0d60d-4aaf-7971-a9e4-eac8b444a4cb",
  type: "page-type/temper-lore-book",
  slug: "journal-of-shardmarshal-vargas",
  title: "Journal of Shardmarshal Vargas",
  collection: "temper-lore-collection/west-weald-writings",
  esoBookId: 7866,
  bookIndex: 50,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
