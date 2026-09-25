import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const morokeisPower = {
  id: "01a0d60b-8108-739d-aa47-53021c3fba19",
  type: "page-type/temper-lore-book",
  slug: "morokeis-power",
  title: "Morokei's Power",
  collection: "temper-lore-collection/solitude-soliloquies",
  esoBookId: 5942,
  bookIndex: 44,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
