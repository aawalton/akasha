import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const izzmotharsPower = {
  id: "01a0d60d-708d-76bc-84fb-8c00355c9c3a",
  type: "page-type/temper-lore-book",
  slug: "izzmothars-power",
  title: "Izzmothar's Power",
  collection: "temper-lore-collection/dungeon-delver-documents",
  esoBookId: 7794,
  bookIndex: 7,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
