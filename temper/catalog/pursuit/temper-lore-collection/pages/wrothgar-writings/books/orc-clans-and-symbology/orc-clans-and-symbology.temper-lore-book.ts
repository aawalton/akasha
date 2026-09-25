import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const orcClansAndSymbology = {
  id: "01a0d5f6-d68b-7d8f-ba97-233b0bbd4a69",
  type: "page-type/temper-lore-book",
  slug: "orc-clans-and-symbology",
  title: "Orc Clans and Symbology",
  collection: "temper-lore-collection/wrothgar-writings",
  esoBookId: 3199,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
