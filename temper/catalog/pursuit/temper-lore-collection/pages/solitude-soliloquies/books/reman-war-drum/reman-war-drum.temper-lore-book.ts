import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const remanWarDrum = {
  id: "01a0d60b-8108-726b-853a-e39ce71c5069",
  type: "page-type/temper-lore-book",
  slug: "reman-war-drum",
  title: "Reman War Drum",
  collection: "temper-lore-collection/solitude-soliloquies",
  esoBookId: 5920,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
